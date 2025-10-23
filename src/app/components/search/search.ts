import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product-service';
import { Iproduct } from '../../Models/iproduct';
import { ProductCard } from '../product-card/product-card';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.generated';

@Component({
  selector: 'app-search',
  imports: [ProductCard],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {
  query: string = '';
  results: Iproduct[] = [];
  isLoading: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const rawQuery = params.get('query') || '';
      this.query = decodeURIComponent(rawQuery.trim());
      if (!this.query) return;

      this.isLoading = true;
      this.handleAISearch(this.query);
    });
  }
  async handleAISearch(query: string) {
    try {
      const prods = await firstValueFrom(this.productService.getAllProducts());
      const products = prods.map((p: any) => ({
        name: p.name,
        description: p.description,
        colors: p.colors,
        sizes: p.sizes,
      }));

      const systemPrompt = `
        You are a smart shopping assistant for an e-commerce website.

        You will receive:
        - A JSON list of products (each with name, description, colors, and sizes).
        - A user query describing what they want (e.g., "عاوز تيشيرت برتقالي", "بنطلون لارج", "شورت", etc.).

        Your task:
        1. Understand the user's intent and identify keywords like product type (t-shirt, pants, shorts, shoes, etc.), color, and size.
        2. Match these keywords with the products in the JSON list by comparing name, description, available colors, and sizes.
        3. Respond only with the most relevant product names separated by commas (", ") if multiple match.
        4. If the user says only a general type (like "بنطلون", "تيشيرت", "شورت"), return all products that belong to that category.
        5. If details like color or size are included, return only the matching ones.
        6. If the product type exists but color/size not found, still return that type.
        7. If no reasonable match exists, respond exactly with: "none".
        8. Do not add any extra text — only product names separated by commas.

        Here is the product list (in JSON):
        ${JSON.stringify(products, null, 2)}
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${environment.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query },
          ],
        }),
      });

      const data = await response.json();
      const result = data.choices?.[0]?.message?.content?.trim();

      console.log('AI suggested:', result);

      if (result && result.toLowerCase() !== 'none') {
        const queryList = result.split(',').map((q: string) => q.trim().toLowerCase());

        this.results = prods.filter((p) =>
          queryList.some((q: string) => p.name.toLowerCase().includes(q))
        );
      } else {
        this.results = [];
      }
    } catch (err) {
      console.error('AI Search Error:', err);
      this.results = [];
    } finally {
      this.isLoading = false;
    }
  }
}

// ngOnInit(): void {
// this.activatedRoute.paramMap.subscribe((params) => {
//   this.query = params.get('query') || '';
//   if (this.query) {
//     const queryList = decodeURIComponent(this.query)
//       .split(',')
//       .map((q) => q.trim().toLowerCase());

//     this.productService.getAllProducts().subscribe((data) => {
//       this.results = data.filter((p) =>
//         queryList.some((q) =>
//           `${p.name} ${p.description} ${p.colors.join(' ')} ${p.sizes.join(' ')}`
//             .toLowerCase()
//             .includes(q)
//         )
//       );
//     });
//   }
// });
// }

// ========================================
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../../Services/product-service';
// import { Iproduct } from '../../Models/iproduct';
// import { ProductCard } from '../product-card/product-card';

// @Component({
//   selector: 'app-search',
//   imports: [ProductCard],
//   templateUrl: './search.html',
//   styleUrl: './search.scss',
// })
// export class Search implements OnInit {
//   query: string = '';
//   results: Iproduct[] = [];
//   constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}
//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe((params) => {
//       this.query = params.get('query') || '';
//       if (this.query) {
//         this.productService.getAllProducts().subscribe((data) => {
//           this.results = data.filter((p) =>
//             p.name.toLowerCase().includes(this.query.toLowerCase())
//           );
//         });
//         console.log(this.results);
//       }
//     });
//   }
// }

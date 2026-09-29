# Angular Responsive Grid

A lightweight, directive-based responsive grid system for Angular 21+ powered by CSS Grid and native Signals.

Eliminate container wrapper boilerplate (`<jp-grid-container>`, `<jp-grid-element>`). Build flexible, responsive grid layouts by attaching directives directly to semantic HTML elements.

## Features

- **Zero Component Wrappers**: Apply directives straight to `<div>`, `<section>`, `<form>`, or any HTML tag.
- **Pure CSS Grid**: Benefit from native track placement and gap handling without fractional percentage round-off bugs.
- **Mobile-First Responsive Cascade**: Define spans from mobile upwards (`xs` -> `sm` -> `md` -> `lg` -> `xl` -> `xxl`).
- **Bootstrap-Style Nesting**: Nest a grid directly within any grid column.
- **Built-In Visual Debug Mode**: Highlight containers and items with customizable hex colors without impacting layout metrics.
- **SSR Compatible**: Safe execution during server-side pre-rendering.

## Installation

Install the library into your Angular workspace:

```bash
npm install angular-responsive
```

## Getting Started
Import `JP_RESPONSIVE_DIRECTIVES` or individual directives into your standalone component:

```ts
import { Component } from '@angular/core';
import { JP_RESPONSIVE_DIRECTIVES } from 'angular-responsive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JP_RESPONSIVE_DIRECTIVES],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
```

## Breakpoints Reference
Spans are evaluated mobile-first:

| Key | Media Query | Target Devices |
|:--- |:---|:---|
| `xs` | `< 576px` | Mobile portrait |
| `sm` | `>= 576px` | Small devices / Large phones |
| `md` | `>= 768px` | Tablets |
| `lg` | `>= 992px` | Desktops / Laptops |
| `xl` | `>= 1200px` | Large desktops |
| `xxl` | `>= 1400px` | Ultra-wide monitors |

## API Reference

`[jpGrid]` (Container Directive)
Turns any HTML element into a 12-column CSS Grid container.

| Input | Type | Default | Description |
|:--- |:--- |:--- |:--- |
| `nbCol` | `number` | 12 |  Total number of grid columns. |
| `gap` | `number` | 6 | Grid gap between columns and rows in pixels. |
| `gridFlow` | `string` | `row` | CSS `grid-auto-flow` pattern (`row`, `column`,`dense`, etc.). |
| `debug` | `boolean` | `false` | Enables visual outlines for the container and its children. |
| `debugParentColor` | `string` | `red` | Hex color for the container outline in debug mode. |
| `debugChildColor` | `string` | `blue` | Hex color passed to child items for their debug outline. |
| `debugChildHoverColor` | `string` | `orange` | Hex color passed to child items for their debug hover. |

`[jpGridElement]` / Responsive Attribute Selectors (Child Directive)
Controls column span (grid-column: span X) and row span (grid-row: span Y).

> **Note**: You do not need to explicitly write `jpGridElement`. Adding any col* or row* input automatically activates the directive on the host element.

| Input | Type | Default | Description |
|:--- |:--- |:--- |:--- |
| `colDefault` | `GridSpan` (1-12) | 12 | Fallback column span (full width by default). |
| `colXs` | `GridSpan` (1-12) | `undefined` | Column span on screens `< 576px` |
| `colSm` | `GridSpan` (1-12) | `undefined` | Column span on screens `>= 576px` |
| `colMd` | `GridSpan` (1-12) | `undefined` | Column span on screens `>= 768px` |
| `colLg` | `GridSpan` (1-12) | `undefined` | Column span on screens `>= 992px` |
| `colXl` | `GridSpan` (1-12) | `undefined` | Column span on screens `>= 1200px` |
| `colXXl` | `GridSpan` (1-12) | `undefined` | Column span on screens `>= 1400px` |
| `rowDefault` | `number` | 1 | Fallback row height span (occupies 1 row by default) |
| `rowXs` ... `rowXXl` | `number` | `undefined` | Row height span on corresponding breakpoints |

## Examples

### Basic Responsive Grid
Items take 12 columns (full width) on mobile by default, switch to 6 columns on tablets (`md`), and 4 columns on desktop (`xl`):

```html
<div jpGrid [gap]="16">
  <div [colMd]="6" [colXl]="4">Card 1</div>
  <div [colMd]="6" [colXl]="4">Card 2</div>
  <div [colMd]="12" [colXl]="4">Card 3</div>
</div>
```

### Multi-Row Spanning (Masonry / Bento Grid)
Create dashboard tiles spanning multiple rows and columns:

```html
<section jpGrid [gap]="12" gridFlow="dense">

  <!-- Large hero banner: spans 8 cols and 2 rows on desktop -->
  <article [colDefault]="12" [colMd]="8" [rowMd]="2">
    Hero Banner
  </article>

  <!-- Side cards -->
  <aside [colDefault]="12" [colMd]="4">Side Widget A</aside>
  <aside [colDefault]="12" [colMd]="4">Side Widget B</aside>
</section>
```

### Nested Grids (Bootstrap Style)
Nest grids seamlessly by declaring jpGrid inside any column element:

```html
<div jpGrid [gap]="20">
  <!-- Left column (8 cols) -->
  <div [colMd]="8">
    <h3>Main Content</h3>

    <!-- Subgrid inside column -->
    <div jpGrid [gap]="8">
      <div [colSm]="6">Sub-item A</div>
      <div [colSm]="6">Sub-item B</div>
    </div>
  </div>

  <!-- Right sidebar (4 cols) -->
  <div [colMd]="4">
    <h3>Sidebar</h3>
  </div>
</div>
```

### Visual Debug Mode
Activate the debug attribute to inspect your grid alignment without modifying element boxes:

```html
<!-- Default debug colors (red parent, blue children) -->
<div jpGrid [gap]="12" debug>
  <div [colMd]="6">Item A</div>
  <div [colMd]="6">Item B</div>
</div>

<!-- Custom hex colors -->
<div 
  jpGrid 
  [gap]="16" 
  debug 
  debugParentColor="#10b981" 
  debugChildColor="#f59e0b"
>
  <div [colMd]="4">Item 1</div>
  <div [colMd]="4">Item 2</div>
  <div [colMd]="4">Item 3</div>
</div>
```

#### Multi-Step Checkout Form with Nested Sub-Grids
```html
<form jpGrid [gap]="24">

  <!-- ================= Left Column: Checkout Steps (8 cols desktop) ================= -->
  <div [colDefault]="12" [colLg]="8" jpGrid [gap]="16">

    <h2 [colDefault]="12">Billing Address</h2>

    <!-- First / Last Name: side by side from tablet (SM) upwards -->
    <div [colDefault]="12" [colSm]="6">
      <label>First Name</label>
      <input type="text" />
    </div>
    <div [colDefault]="12" [colSm]="6">
      <label>Last Name</label>
      <input type="text" />
    </div>

    <!-- Street address: full width of the sub-grid -->
    <div [colDefault]="12">
      <label>Street Address</label>
      <input type="text" />
    </div>

    <!-- City / Postal Code / Country: asymmetric split (5 cols / 3 cols / 4 cols) -->
    <div [colDefault]="12" [colSm]="5">
      <label>City</label>
      <input type="text" />
    </div>
    <div [colDefault]="12" [colSm]="3">
      <label>Postal Code</label>
      <input type="text" />
    </div>
    <div [colDefault]="12" [colSm]="4">
      <label>Country</label>
      <select>...</select>
    </div>

    <hr [colDefault]="12" />

    <h2 [colDefault]="12">Payment Details</h2>

    <!-- Card Number (8 cols) and Security Code (4 cols) -->
    <div [colDefault]="12" [colMd]="8">
      <label>Card Number</label>
      <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
    </div>
    <div [colDefault]="12" [colMd]="4">
      <label>CVC</label>
      <input type="text" placeholder="123" />
    </div>

  </div>

  <!-- ================= Right Column: Order Summary (4 cols desktop) ================= -->
  <aside [colDefault]="12" [colLg]="4" class="order-summary">
    <h3>Order Summary</h3>
    
    <div jpGrid [gap]="8">
      <div [colDefault]="8">Item 1 (x2)</div>
      <div [colDefault]="4" style="text-align: right;">$49.00</div>

      <div [colDefault]="8">Shipping Fee</div>
      <div [colDefault]="4" style="text-align: right;">Free</div>

      <div [colDefault]="12"><hr /></div>

      <div [colDefault]="6"><strong>Total</strong></div>
      <div [colDefault]="6" style="text-align: right;"><strong>$98.00</strong></div>
    </div>

    <button type="submit" style="width: 100%; margin-top: 16px;">Place Order</button>
  </aside>

</form>
```

#### Advanced Product Detail Page with Asymmetric Reordering
```html
<main 
  jpGrid 
  [gap]="20" 
  debug 
  debugParentColor="#059669" 
  debugChildColor="#d97706" 
  debugChildHoverColor="#dc2626">

  <!-- 
    Main Image Gallery:
    - Mobile: 12 cols, 1 row
    - Tablet: 12 cols, 2 rows
    - Desktop (LG): 7 cols, 3 rows
  -->
  <section [colDefault]="12" [colLg]="7" [rowMd]="2" [rowLg]="3" class="media-gallery">
    <img src="main-product.jpg" alt="Main product view" />
  </section>

  <!-- 
    Product Purchase Info & CTA:
    - Anchored on the right side on larger screens (5 cols, 2 rows)
  -->
  <section [colDefault]="12" [colLg]="5" [rowLg]="2" class="product-buy-box">
    <h1>Wireless Pro Headphones</h1>
    <p class="price">$299.00</p>
    <button>Add to Cart</button>
  </section>

  <!-- 
    Social Proof & Warranty Badges:
    - Automatically sits under the buy box on desktop (5 cols)
  -->
  <div [colDefault]="12" [colLg]="5" class="trust-badges">
    <p>⭐⭐⭐⭐⭐ (428 verified reviews)</p>
    <p>2-Year Manufacturer Warranty</p>
  </div>

  <!-- 
    Thumbnail Gallery (Nested Grid):
    - 4 thumbnails taking 3 columns each on desktop
  -->
  <div [colDefault]="12" jpGrid [gap]="10" class="thumbnails-container">
    <div [colDefault]="3"><img src="thumb-1.jpg" alt="Thumbnail 1" /></div>
    <div [colDefault]="3"><img src="thumb-2.jpg" alt="Thumbnail 2" /></div>
    <div [colDefault]="3"><img src="thumb-3.jpg" alt="Thumbnail 3" /></div>
    <div [colDefault]="3"><img src="thumb-4.jpg" alt="Thumbnail 4" /></div>
  </div>

  <!-- Technical Specifications: full width -->
  <article [colDefault]="12" class="specs-section">
    <h2>Technical Specifications</h2>
    <div jpGrid [gap]="12">
      <div [colDefault]="12" [colMd]="6">Battery Life: 40 hours</div>
      <div [colDefault]="12" [colMd]="6">Noise Cancellation: Active (-35 dB)</div>
      <div [colDefault]="12" [colMd]="6">Weight: 250 g</div>
      <div [colDefault]="12" [colMd]="6">Connectivity: Bluetooth 5.4</div>
    </div>
  </article>

</main>
```

## License
MIT

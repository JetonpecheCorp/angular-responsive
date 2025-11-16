# Angular responsive

# grid container

## Attributs
- `gap`: gap CSS (defaut 6)
- `nbColDefault`: nombre de colonnes (defaut 12)
- `nbColXs`: nombre de colonnes sur taille d'écran XS et plus
- `nbColSm`: nombre de colonnes sur taille d'écran SM et plus
- `nbColMd`: nombre de colonnes sur taille d'écran MD et plus
- `nbColLg`: nombre de colonnes sur taille d'écran LG et plus
- `nbColXl`: nombre de colonnes sur taille d'écran XL
- `gridFlowDefault`: Organisation des elements de la grid (defaut row)
- `gridFlowXs`: Organisation des elements de la grid sur taille d'écran XS et plus
- `gridFlowSm`: Organisation des elements de la grid sur taille d'écran SM et plus
- `gridFlowMd`: Organisation des elements de la grid sur taille d'écran MD et plus
- `gridFlowLg`: Organisation des elements de la grid sur taille d'écran LG et plus
- `gridFlowXl`: Organisation des elements de la grid sur taille d'écran XL

## Information 
`gridFlow*`: voir [cette page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-flow)

# Sub grid container
Ajouter une sous `grid` dans une `grid`

# grid element

## Attributs
- `class`: Class CSS
- `colDefault`: Taille de la colonne (defaut 1 (1 - `nbCol`))
- `colXs`: Taille de l'element pour un écran XS et plus (1 - `nbCol`)
- `colSm`: Taille de l'element pour un écran S et Plus (1 - `nbCol`)
- `colMd`: Taille de l'element pour un écran MD et Plus (1 - `nbCol`)
- `colLg`: Taille de l'element pour un écran LG et plus (1 - `nbCol`)
- `colXl`: Taille de l'element pour un écran XL (1 - `nbCol`)

- `rowDefault`: Nombre de lignes occupés
- `rowXs`: Nombre de lignes occupés pour un écran XS et plus
- `rowSm`: Nombre de lignes occupés pour un écran S et plus
- `rowMd`: Nombre de lignes occupés pour un écran MD et plus
- `rowLg`: Nombre de lignes occupés pour un écran LG et plus
- `rowXl`: Nombre de lignes occupés pour un écran XL

# Exemple
```html
<jp-grid-container gridFlowDefault="column dense" [nbColDefault]="12" [gap]="6">
      <jp-grid-element [colMd]="6" [rowMd]="2" [rowLg]="1">
         <h4>Titre</h4>
         <p>...</p>
      </jp-grid-element>

      <jp-grid-element [colMd]="6" [rowLg]="2">
         <h4>Titre</h4>
         <p>...</p>
      </jp-grid-element>

      <jp-grid-element [colMd]="6">
         <h4>Titre</h4>
         <p>...</p>
      </jp-grid-element>
</jp-grid-container>
```
# exemple avec des sous grid
```html
<jp-grid-container> 
   <jp-sub-grid-container>
      <jp-grid-element [colMd]="4">Item A</jp-grid-element>
      <jp-grid-element [colMd]="8">Item B</jp-grid-element>
   </jp-sub-grid-container>

   <jp-sub-grid-container>
      <jp-grid-element [colMd]="2" [rowMd]="2">C</jp-grid-element>
      <jp-grid-element [colMd]="5">D</jp-grid-element>
      <jp-grid-element [colMd]="5">E</jp-grid-element>
   </jp-sub-grid-container>

   <jp-grid-element [colMd]="2">F</jp-grid-element>
   <jp-grid-element [colMd]="7">G</jp-grid-element>
   <jp-grid-element [colMd]="5">H</jp-grid-element>
</jp-grid-container>
```

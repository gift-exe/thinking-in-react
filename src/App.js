import { useState } from 'react';
import './App.css';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function ProductRow({ product }) {
  const name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductCategory({ category }) {
  return (
    <tr>
      <th colSpan="2"> {category} </th>
    </tr>
  );
}

function CategoryAndProductGrouping({ products, category, inStockOnly }) {
  var react_products_objects = []
  react_products_objects.push(<ProductCategory category={category} key={0}/>)
  for (let i = 0; i  < products.length; i++) {
    if (!inStockOnly) {
      react_products_objects.push(<ProductRow product={products[i]} key={i+1}/>)
    } else {
      //get only products that are in stock
      if (products[i].stocked) { react_products_objects.push(<ProductRow product={products[i]} key={i+1}/>) 
      }
    }
  }

  return (
    <tbody>
      {react_products_objects}
    </tbody>
  )
}

function ProductTable({ products, filterText, inStockOnly }) {
  //get unique categories
  var uniqueCats = [...new Set(PRODUCTS.map(item => item.category))];

  var product_table = []
  
  //filter
  uniqueCats = filterText ? uniqueCats.filter(item => item.includes(filterText)) : uniqueCats

  //group items by category
  for (let i = 0; i < uniqueCats.length; i++) {
    var products_belonging_to_category = PRODUCTS.filter(item => item.category === uniqueCats[i]);
    product_table.push(<CategoryAndProductGrouping products={products_belonging_to_category} category={uniqueCats[i]} key={i} inStockOnly={inStockOnly}/>)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        {product_table}
      </table>  
    </div>
  )  
}

function SearchBar({ filterText, inStockOnly, setFilterText, setInStockOnly }){
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} onChange={(e) => setFilterText(e.target.value)}/>
      <label>
        <input type="checkbox" onChange={(e) => setInStockOnly(e.target.checked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  
  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} setFilterText={setFilterText} setInStockOnly={setInStockOnly}/>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  )
}

function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  )
}

export default App;

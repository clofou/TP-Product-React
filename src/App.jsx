import { useState } from "react"

function App() {
  const PRODUCTS = [  
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},  
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},  
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},  
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},  
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},  
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}  
  ]


  const [stock, setStock] = useState(false)
  const [searchText, setSearchText] = useState("")
  let filterProducts = PRODUCTS
  if (searchText!="") {
    filterProducts = PRODUCTS.filter(p=>p.name.toLowerCase().includes(searchText.toLowerCase()))
    console.log(filterProducts)
  }
  if (stock!=false) {
    filterProducts = filterProducts.filter(p=>!p.stocked)
  }
  return <div className="my-3">
    <Header searchText={searchText} setSearchText={setSearchText} stock={stock} setStock={setStock}/>
    <ProductTable products={filterProducts} />
  </div>
}

function Header({searchText, setSearchText, stock, setStock}){
  return <form>
    <SearchBar searchText={searchText} onSearchText={setSearchText} />
    <ShowStock checked={stock} onCheck={setStock} />
  </form>
}

function ShowStock({ checked, onCheck }) {
  return <div>
    <input type="checkbox" className="form-check-control me-2" checked={checked} onChange={(e) => onCheck(e.target.checked)} />
    <label htmlFor="" className="form-check-label">Show Products On Stock</label>
  </div>
}

function SearchBar({ searchText, onSearchText }) {
  return <div>
    <input type="text" value={searchText} className="form-control" onChange={(e) => onSearchText(e.target.value)} placeholder="Search ..." />
  </div>
}

function ProductTable({products}){
  const row = []
  let lastCategory = undefined

  for (let product of products) {
    if (product.category !== lastCategory) {
      row.push(<ProductCategoryRow category={product.category} key={product.category}/>)
    }
    lastCategory = product.category
    row.push(<ProductRow product={product} key={product.name}/>)
  }
  return <table className="table">
    <thead>
      <tr>
        <td><strong>Name</strong></td>
        <td><strong>Price</strong></td>
      </tr>
    </thead>
    <tbody>
      {row}
    </tbody>
  </table>
}

function ProductCategoryRow({category}){
  return <tr>
    <td colSpan={2} style={{textAlign: "center"}}><strong>{category}</strong></td>
  </tr>
}

function ProductRow({product}){
  const style = product.stocked ? undefined : {color: "red"}

  return <tr>
    <td style={style}>{product.name}</td>
    <td>{product.price}</td>
  </tr>
}
export default App
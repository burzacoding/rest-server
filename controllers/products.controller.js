const getProducts = (req, res) => {
  res.json({
    message: "Products ok"
  })
}

const getSingleProduct = (req, res) => {
  const id = req.params.id
  res.json({
    message: "Product detail ok: " + id 
  })
}

const createProduct = (req, res) => {
  res.json({
    message: "Product created"
  })
}

const updateProduct = (req, res) => {
  res.json({
    message: "Product updated"
  })
}

const deleteProduct = (req, res) => {
  res.json({
    message: "Product deleted"
  })
}



module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
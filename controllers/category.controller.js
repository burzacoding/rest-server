const getCategories = (req, res) => {
  res.json({
    message: "Categories ok"
  })
}

const getSingleCategory = (req, res) => {
  const id = req.params.id
  res.json({
    message: "Category detail ok: " + id 
  })
}

const createCategory = (req, res) => {
  res.json({
    message: "Category created"
  })
}

const updateCategory = (req, res) => {
  res.json({
    message: "Category updated"
  })
}

const deleteCategory = (req, res) => {
  res.json({
    message: "Category deleted"
  })
}



module.exports = {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
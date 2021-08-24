const { Types } = require("mongoose");
const { subirArchivo } = require("../utils/subirArchivo");
const { User, Category, Product } = require("../models");

const uploadFile = async (req, res) => {
  // Obtiene la colección previamente validada
  const { coleccion, id } = req.params;
  // Obtiene el archivo en cuestión
  const archivo = req.files.archivo;
  // Obtiene el usuario que envió la petición
  const usuario = res.locals.user;

  try {
    if (coleccion === "users") {
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(400).json({
          message: `El id proporcionado (${id}) no es un mongoid válido.`,
        });
      }
      if (usuario.role !== "admin" && usuario._id.toString() !== id) {
        return res.status(403).json({
          message: `Usuario ${usuario.name} no tienes permiso para cambiar la foto de perfil de otros usuarios.`,
        });
      }
      const path = await subirArchivo(archivo, coleccion, id);
      const usuarioPorActualizar = await User.findByIdAndUpdate(
        id,
        {
          img: path,
        },
        { new: true }
      );
      return res.status(201).json({
        message: `El usuario ${usuarioPorActualizar.name} actualizó su foto de perfil correctamente.`,
        usuario: usuarioPorActualizar,
      });
    }
    if (!usuario.role !== "admin") {
      return res.status(403).json({
        message: `Usuario ${usuario.name} no tiene permiso para cambiar la foto de la categoria o producto con id: ${id}`,
      });
    }
    // A partir de este punto el usuario ya está validado como admin
    const path = await subirArchivo(archivo, coleccion, id);
    if (coleccion === "products") {
      const product = await Product.findByIdAndUpdate(
        id,
        { img: path },
        { new: true }
      );
      return res.status(201).json({
        message: `La foto del producto ${product.name} se actualizó correctamente.`,
        product,
      });
    }
    if (coleccion === "categories") {
      const category = await Category.findByIdAndUpdate(
        id,
        { img: path },
        { new: true }
      );
      return res.status(201).json({
        message: `La foto de la categoria ${category.name} se actualizó correctamente.`,
        category
      })
    }
  } catch (err) {
    console.log("Error en controller uploadFile:", err);
    res.status(500).json({
      message:
        "Ha ocurrido un error inesperado en el servidor, por favor comuniquese con un amdinistrador o vuelva a intentarlo en unos momentos.",
    });
  }
};

module.exports = {
  uploadFile,
};

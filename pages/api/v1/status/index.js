function status(request, response) {
  response.status(200).json({
    retorno: "Retornou com sucesso!"
  });
}

export default status;
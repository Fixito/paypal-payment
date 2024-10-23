const notFound = (_req, res) =>
  res.status(400).json({ message: "La route n'existe pas" });

export default notFound;

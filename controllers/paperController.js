const Paper = require("../models/Paper");

function classify(text) {
  if (text.includes("SVM")) return "supervised";
  if (text.includes("clustering")) return "unsupervised";
  return "semi-supervised";
}

exports.createPaper = async (req, res) => {
  const { title, authors, category, abstract, year, keywords } = req.body;

  const techniqueType = classify(abstract);

  await Paper.create({
    title,
    authors,
    category,
    abstract,
    year,
    keywords: keywords.split(","),
    pdf: req.file.filename,
    techniqueType,
    uploadedBy: req.session.user._id
  });

  res.redirect("/papers");
};

exports.getPapers = async (req, res) => {
  const papers = await Paper.find();
  res.render("papers/index", { papers });
};

exports.deletePaper = async (req, res) => {
  await Paper.findByIdAndDelete(req.params.id);
  res.redirect("/papers");
};
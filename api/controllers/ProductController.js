/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  productChecking: async (req, res) => {
    const db = Product.getDatastore().manager;
    const rawMongoCollection = db.collection(Product.tableName);
    try {
      const { productCode, productQuantity, productName, checkType } = req.body;
      console.log(req.body);
      const Aggregation = [
        {
          $match: {
            productCode: productCode,
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
        {
          $project: {
            productQuantity: 1,
            _id: 0,
          },
        },
      ];
      const result = await rawMongoCollection.aggregate(Aggregation).toArray()
      console.log(result);
    //   const checking = await Product.create({
    //     productCode: productCode,
    //     productQuantity: productQuantity,
    //     productName: productName,
    //     checkType: checkType,
    //   }).fetch();
    //   console.log(checking);
      res.status(200).json({
        status: true,
        message: "Successfully Created Checking ",
        data: checking,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: false,
        message: "Getting Error While Product Checking !",
      });
    }
  },
};

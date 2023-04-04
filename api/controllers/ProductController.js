/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { STATUS_CODE } = require("../../config/config");

module.exports = {
  checkinQty: async (req, res) => {
    try {
      const { productQuantity, productCode, productName } = req.body;
      console.log(req.body);
      const productIn = await Product.create({
        productQuantity: productQuantity,
        productCode: productCode,
        productName: productName,
        inQuantity: productQuantity,
        checkType: "In",
      }).fetch();
      console.log(productIn);
      res.status(STATUS_CODE.success).json({
        status: true,
        data: productIn,
        message: "Successfully checked product in",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: false,
        error: err,
        message: "Something Getting Error while checkin",
      });
    }
  },
  checkoutQty: async (req, res) => {
    try {
      const { productQuantity, productCode, productName, outQuantity } =
        req.body;
      console.log(req.body);
      const db = Product.getDatastore().manager;
      const rawMongoCollection = db.collection(Product.tableName);
      //
      const Aggregation = [
        {
          $match: {
            productCode: productCode,
          },
        },
        {
          $project: {
            in: "$inQuantity",
            out: "$outQuantity",
          },
        },
        {
          $group: {
            _id: 0,
            in: {
              $push: "$in",
            },
            out: {
              $push: "$out",
            },
          },
        },
        {
          $addFields: {
            invalue: {
              $reduce: {
                input: "$in",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this"],
                },
              },
            },
            outvalue: {
              $reduce: {
                input: "$out",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this"],
                },
              },
            },
          },
        },
      ];
      //
      let PRODUCTOUT;
      let MESSAGE;
      let STATUS;
      //
      let result = await rawMongoCollection.aggregate(Aggregation).toArray();
      console.log("InQuantity", result[0].invalue);
      console.log("OutQuantity", result[0].outvalue);
      let TotalQty = result[0].invalue - result[0].outvalue;
      let DATA;
      if (TotalQty >= outQuantity) {
        const productOut = await Product.create({
          productQuantity: productQuantity,
          productCode: productCode,
          productName: productName,
          outQuantity: outQuantity,
          checkType: "Out",
        }).fetch();
        DATA = productOut;
        STATUS = true;
        MESSAGE = "Product Is Successfully Checked Out";
        console.log("The Out Request Is Eligible to Checkout");
      } else {
        STATUS = false;
        (MESSAGE =
          "The Available Stock Quantity is not eligible To Check Out !"),
          console.log(
            "The Available Stock Quantity is not eligible To Check Out !"
          );
      }
      // console.log(productOut);
      res.status(200).json({
        status: STATUS,
        data: PRODUCTOUT,
        message: MESSAGE,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: STATUS,
        error: err,
        message: "Something Getting Error while checkOut",
      });
    }
  },
  productChecking: async (req, res) => {
    try {
      const { productCode, productQuantity, productName, checkType } = req.body;
      console.log(req.body);
      const db = Product.getDatastore().manager;
      const rawMongoCollection = db.collection(Product.tableName);
      //
      const Aggregation = [
        {
          $match: {
            productCode: productCode,
          },
        },
        {
          $project: {
            in: "$inQuantity",
            out: "$outQuantity",
          },
        },
        {
          $group: {
            _id: 0,
            in: {
              $push: "$in",
            },
            out: {
              $push: "$out",
            },
          },
        },
        {
          $addFields: {
            invalue: {
              $reduce: {
                input: "$in",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this"],
                },
              },
            },
            outvalue: {
              $reduce: {
                input: "$out",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this"],
                },
              },
            },
          },
        },
      ];
      const mresult = await rawMongoCollection.aggregate(Aggregation).toArray();
      //
      const inValue = mresult[0].invalue;
      const outValue = mresult[0].outvalue;
      let totalQty = inValue - outValue;
      console.log(totalQty);
      res.status(200).json({
        status: true,
        message: "Successfully Created Checking ",
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

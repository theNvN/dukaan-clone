import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Switch, Route, Redirect } from "react-router-dom";

import EditableProductList from "../components/EditableProductList";
import EditProductForm from "../components/EditProductForm";

import {
  selectedProduct,
  addProductDialogOpen,
  shopLoading,
} from "../selectors/shopSelectors";

import {
  showEditProductDialog,
  showAddProductDialog,
  hideProductFormDialog,
  addProduct,
  editProduct,
} from "../actions/shopActions";
import AddProductForm from "../components/AddProductForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: "bold",
    padding: "16px 0px",
  },
  fab: {
    float: "right",
    margin: "4px",
  },
}));

function ShopView({
  // Props from parent
  routeMatch,
  tabValue,
  shopDetail,

  // State values
  loading,
  selectedProductToEdit,
  addProductDialogOpen,

  // Dispatchers
  showEditProductDialog,
  showAddProductDialog,
  hideProductFormDialog,
  addProduct,
  editProduct,
}) {
  const classes = useStyles();

  const handleProductItemClick = (product) => {
    showEditProductDialog(product);
  };

  const handleAddProduct = (product) => {
    if (!product.image) delete product.image;
    addProduct(product);
  };

  const handleEditProduct = (product) => {
    console.log(product);
    editProduct(product);
  };

  const paths = ["/", "/orders", "/shop"];
  const redirect = <Redirect to={`${routeMatch.path}${paths[tabValue]}`} />;

  return (
    <Grid className={classes.root} item container fullWidth>
      <Switch>
        <Route path={`${routeMatch.path}/orders`}>
          <Grid item fullWidth>
            Orders
          </Grid>
        </Route>

        <Route path={`${routeMatch.path}/shop`}>
          <Grid item fullWidth>
            Shop Details
          </Grid>
        </Route>

        <Route path={`${routeMatch.path}/`}>
          <Grid item fullWidth xs={12}>
            <EditableProductList
              fullWidth
              productsData={
                shopDetail["shop_products"] ? shopDetail["shop_products"] : []
              }
              onItemClick={handleProductItemClick}
            />
            <Fab
              className={classes.fab}
              color="primary"
              variant="extended"
              onClick={showAddProductDialog}
            >
              <AddRoundedIcon />
              Add Product
            </Fab>
          </Grid>
        </Route>
      </Switch>

      {redirect}

      {/* Dialog Box */}
      <Dialog
        open={Boolean(selectedProductToEdit)}
        onClose={hideProductFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Edit Product Details</DialogTitle>
        <DialogContent>
          <EditProductForm
            product={selectedProductToEdit}
            loading={loading}
            onSave={handleEditProduct}
            onCancel={hideProductFormDialog}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={addProductDialogOpen}
        onClose={hideProductFormDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Add Product Details</DialogTitle>
        <DialogContent>
          <AddProductForm
            loading={loading}
            onSave={handleAddProduct}
            onCancel={hideProductFormDialog}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedProductToEdit: selectedProduct(state),
    addProductDialogOpen: addProductDialogOpen(state),
    loading: shopLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showEditProductDialog: (product) =>
      dispatch(showEditProductDialog(product)),
    showAddProductDialog: () => dispatch(showAddProductDialog()),
    hideProductFormDialog: () => dispatch(hideProductFormDialog()),
    editProduct: (product) => dispatch(editProduct(product)),
    addProduct: (product) => dispatch(addProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopView);
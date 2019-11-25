import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";

import axios from "../../axios.orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    console.log("[Orders] componentDidMount");
    this.props.fetchOrders(this.props.token);
  }

  componentWillUnmount() {
    console.log("[Orders] componentWillUnmount");
  }
  render() {
    let orders = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
    return orders;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: token => dispatch(actions.fetchOrders(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

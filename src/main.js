import React, { Component }  from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

class FieldGroup extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: props.value
    }
  }
  onChange(e) {
    let o = {};
    o[this.props.name] = e.target.value;
    this.props.parentCallback(o)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    let { id, label, type, placeholder, ...others } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{ label }</label>
        <input type={ type } className="form-control" id={ id } placeholder={ placeholder } value={ this.state.value } required onChange={ this.onChange }/>
      </div>
    );
  }
}


class Sign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validate: false,
      name:'',
      tel:'',
      bid: bid
    }
    this.parentCallback = this.parentCallback.bind(this);
    this.submit = this.submit.bind(this);
  }
  parentCallback(obj) {
    this.setState(obj);
  }

  submit() {
    let regx = /^1[34578]\d{9}$/;
    if(!regx.test(this.state.tel)) {
      alert('手机号不合法!');
      return 0;
    }

    if(this.state.name != '' && this.state.tel != '' && this.state.nickid != '') {
      fetch( '/bind' ,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          tel: this.state.tel,
          bid: this.state.bid,
          code: code,
          openid: openid
        })
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(res.status == 200) {
          alert('绑定成功!');
          wx.ready(function() {
            wx.closeWindow();
          })
        } else {
          alert('绑定失败,请确认信息!');
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      })
    } else {
      alert('请完善信息!');
    }
  }

  render() {
    let styleSheets = {
      panel: {
        marginTop: "30px"
      }
    }
    return (
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="panel panel-default" style={ styleSheets.panel }>
              <div className="panel-body">
                <form role="form">
                  <FieldGroup
                    id="name"
                    label="姓名"
                    name="name"
                    placeholder="请填写您的真实姓名"
                    type="text"
                    validate={ this.validate }
                    value={ this.state.name }
                    parentCallback= { this.parentCallback }
                  />
                  <FieldGroup
                    id="tel"
                    label="手机号码"
                    name="tel"
                    placeholder="请填写您的手机号码"
                    type="tel"
                    validate={ this.validate }
                    value={ this.state.tel }
                    parentCallback= { this.parentCallback }
                  />
                  <FieldGroup
                    id="business"
                    label="洗车店"
                    name="bid"
                    placeholder="请填写您所在的洗车店id"
                    type="text"
                    validate={ this.validate }
                    value={ this.state.bid }
                    parentCallback= { this.parentCallback }
                  />
                  <button className="btn btn-primary btn-block" type="button" onClick={ this.submit }>绑定</button>
                </form>
              </div>
            </div>
          </div>

        </div>
    )
  }
}


render(
  <Sign />,
  document.querySelector('#App')
)

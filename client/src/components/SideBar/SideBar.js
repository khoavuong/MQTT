import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import style from "./SideBar.module.css";

class SidebarItem extends Component {
  state = {
    isCollapsed: true,
  };

  toggleCollapsed = () => {
    this.setState((prevState, prevProps) => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  onClick = () => {
    if (Array.isArray(this.props.item.items)) {
      this.toggleCollapsed();
    }
    if (this.props.item.url) {
      console.log(this.props.item.url);
      this.props.history.push(this.props.item.url);
    }
  };

  render() {
    let expandIcon;
    if (Array.isArray(this.props.item.items) && this.props.item.items.length) {
      expandIcon = !this.state.isCollapsed ? (
        <ExpandLessIcon className={style.expandarrowexpanded} />
      ) : (
        <ExpandMoreIcon className={style.expandarrow} />
      );
    }
    let Icon = this.props.item.Icon;
    return (
      <>
        <ListItem
          className={style.Item}
          onClick={this.onClick}
          button
          dense
          {...this.props.rest}
        >
          <div
            style={{ paddingLeft: this.props.depth * this.props.depthStep }}
            className={style.Content}
          >
            {Icon && <Icon className={style.icon} fontSize="small" />}
            <div className={style.text}>{this.props.item.label}</div>
          </div>
          {expandIcon}
        </ListItem>
        <Collapse in={!this.state.isCollapsed} timeout="auto" unmountOnExit>
          {Array.isArray(this.props.item.items) ? (
            <List disablePadding dense>
              {this.props.item.items.map((subItem, index) => (
                <React.Fragment key={`${subItem.name}${index}`}>
                  {subItem === "divider" ? (
                    <Divider style={{ margin: "6px 0" }} />
                  ) : (
                    <SidebarItem
                      depth={this.props.depth + 1}
                      depthStep={this.props.depthStep}
                      item={subItem}
                      history={this.props.history}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : null}
        </Collapse>
      </>
    );
  }
}

const sideBar = (props) => {
  // console.log(props);
  return (
    <div className={style.SideBar}>
      <List disablePadding dense>
        {props.items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                depthStep={30}
                depth={0}
                expanded={null}
                item={sidebarItem}
                {...props}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default sideBar;

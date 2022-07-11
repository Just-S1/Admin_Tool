/* eslint-disable */

import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import useAuth from '../hooks/useAuth';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { NimbleEmojiIndex } from 'emoji-mart';
import Typography from 'src/theme/overrides/Typography';
import Location from 'src/pages/dashboard/Location';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";


// import { useHistory } from "react-router-dom";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) => ({
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(0.5),
    width: '16px'
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1
  },
  labelTextBold: {
    fontWeight: 'bold'
  },
  root: {
    position: 'relative',
    margin: theme.spacing(1),
    '& .MuiTreeItem-label': {
      paddingLeft: '0 !important',
      '& p': {
        whiteSpace: 'nowrap',
        width: '100px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    '&:before': {
      pointerEvents: 'none',
      content: '""',
      position: 'absolute',
      width: 24,
      left: -24,
      top: 14,
      borderBottom: (props) =>
        // only display if the TreeItem is not root node
        props.main === false &&
        // only display if the TreeItem has any child nodes
        `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
  },
  content: {
    // flexDirection: 'row-reverse'
    padding: 0,
    borderRadius: theme.spacing(0.5)
  },
  iconContainer: {
    '& .close': {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 4,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  },
  contextMenu: {
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'rgb(33,43,54)',
    padding: '10px 0px',
    border: theme.palette.mode === 'light' ? 'solid #c8cacc' : 'solid #626f7e',
    borderRadius: '5px',
    zIndex: '1000 !important',
    color: theme.palette.mode === 'light' ? 'black' : 'white',
    '& .react-contextmenu-item': {
      cursor: 'pointer',
      padding: '5px 20px'
    },
    '& .react-contextmenu-item:hover': {
      color: 'white',
      background: theme.palette.mode === 'light' ? 'rgb(17,131,202)' : 'rgb(17,131,202)'
    }
  }
}));

export function StyledTreeItem(props) {
  const classes = useStyles(props);
  const { labelText, expanded, setExpanded, main, node, children, ...other } = props;
  
  const history = useNavigate();

  return (
    <TreeItem onClick={() => {}}
      collapseIcon={
        <MinusSquare
          onClick={(e) => {
            e.preventDefault();
            const expandedNodes = expanded.filter((expandedValue) => expandedValue !== props.nodeId);
            setExpanded && setExpanded(expandedNodes);
          }}
        />
      }
      expandIcon={
        <PlusSquare
          onClick={(e) => {
            e.preventDefault();
            const expandedNodes = [...expanded, props.nodeId];

            setExpanded && setExpanded(expandedNodes);
          }}
        />
      }
      endIcon={
        <CloseSquare
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      }
      label={<div onClick={() => ( children?.children.length > 0 ? history(`/dashboard/${children?.name.toLowerCase().replace(' ', '-')}/${children?.name.toLowerCase().replace(' ', '-')}`) : history(`/dashboard/${children?.name.toLowerCase().replace(' ', '-')}`) ) }>{labelText}</div>}
      classes={{
        root: classes.root,
        content: classes.content,
        group: classes.group,
        iconContainer: classes.iconContainer
      }}
      {...other}
    >
      {children.children?.map((item_children, index) => {
        return (
          <StyledTreeItem
            key={index}
            nodeId={index + item_children.name}
            main={false}
            labelText={item_children.name}
            children={item_children}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        );
      })}
    </TreeItem>
  );
}

export default function NavTreeItem() {
  const { user } = useAuth();
  
  const [ expanded, setExpanded ] = React.useState([])

  console.log(user)
  
  if (user !== null && user.menu.length !== 0) {
    const { menu } = user;
    return (
      <TreeView expanded={expanded}>
        {menu?.map((node) => {
          return <StyledTreeItem key={node.id} nodeId={node.id} labelText={node.name} children={node} expanded={expanded} setExpanded={setExpanded} />;
        })}
      </TreeView>
    );
  } else {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>No Modules to view</p>;
  }
}

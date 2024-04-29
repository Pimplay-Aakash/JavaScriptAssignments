"use client";

import React, { useState } from 'react';

// Component to represent a node in the tree
function ShowData({ node, onCheckChange, margin = 10 }) {
  const [show, setShow] = useState(false); // State to control whether children are shown

  // Handler for checkbox changes
  const handleCheck = (event) => {
    const isChecked = event.target.checked;
    onCheckChange(node, isChecked); // Propagate change to parent
  };

  // Toggle showing/hiding children
  const toggleShow = () => {
    setShow(!show);
  };

  // const showchild = (node)=> {
  //     node.children ? "➡️":"⬆️",,,, node.children.length > 0 ? "➡️":""
  // }

  return (
    <div style={{ marginLeft: margin, padding: '5px' }}>
      <div className='flex gap-2 items-center'>
        <input
          type="checkbox"
          checked={node.isChecked} // Set based on node state
          onChange={handleCheck}
          className='size-4'
        />
        <h1 onClick={toggleShow} style={{ cursor: 'pointer' }} className='cursor-pointer border-2 border-white p-1 mb-3'>
          {node.name} {/* Display the name of the node */}{node.children.length != 0 ? show ? "❌":"⬇️":""}
        </h1>
      </div>
      {show && node.children && ( // Display children if "show" is true
        <div>
          {node.children.map((child, index) => (
            <ShowData
              key={index}
              node={child} // Pass the child node
              onCheckChange={onCheckChange} // Propagate the change
              margin={margin + 10} // Increase margin for indentation
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Initialize the tree data with default "isChecked" values
function initializeTreeData(nodes) {
  return nodes.map((node) => ({
    ...node, // Keep other properties
    isChecked: false, // Default to unchecked
    children: node.children ? initializeTreeData(node.children) : [], // Recursively initialize children
  }));
}

// Main component for the tree
export default function TreeComponent() {
  const initialData = [
    {
      name: "Parent 1",
      children: [
        {
          name: "Child 1",
          children: [
            {
              name: "Grandchild 1",
              children: [
                {
                  name: "Grand Grandchild 1",
                  children: [],
                },
                {
                  name: "Grand Grandchild 2",
                  children: [],
                },
                {
                  name: "Grand Grandchild 3",
                  children: [],
                },
              ],
            },
            {
              name: "Grandchild 2",
              children: [],
            },
          ],
        },
        {
          name: "Child 2",
          children: [
            {
              name: "Grandchild 1",
              children: [],
            },
            {
              name: "Grandchild 2",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "Parent 1",
      children: [
        {
          name: "Child 1",
          children: [
            {
              name: "Grandchild 1",
              children: [
                {
                  name: "Grand Grandchild 1",
                  children: [],
                },
                {
                  name: "Grand Grandchild 2",
                  children: [],
                },
                {
                  name: "Grand Grandchild 3",
                  children: [],
                },
              ],
            },
            {
              name: "Grandchild 2",
              children: [],
            },
          ],
        },
        {
          name: "Child 2",
          children: [
            {
              name: "Grandchild 1",
              children: [],
            },
            {
              name: "Grandchild 2",
              children: [],
            },
          ],
        },
      ],
    },
  ];

  // Initialize the tree data
  const [treeData, setTreeData] = useState(initializeTreeData(initialData));

  // Recursively update children based on parent state
  const updateChildren = (node, isChecked) => {
    node.isChecked = isChecked; // Set the state
    if (node.children) {
      node.children.forEach((child) => updateChildren(child, isChecked)); // Recursive propagation downward
    }
  };

  // Recursively update parent nodes based on children states
  const updateParents = (node, parentMap) => {
    if (!parentMap.has(node)) return; // If no parent, return
    const parent = parentMap.get(node); // Get parent node
    parent.isChecked = parent.children.every((child) => child.isChecked); // Update parent's state based on children
    
    updateParents(parent, parentMap); // Continue upward
  };

  // Build a map of parent-child relationships
  const buildParentMap = (nodes, parentMap = new Map()) => {
    nodes.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => parentMap.set(child, node)); // Add parent-child relationship
        buildParentMap(node.children, parentMap); // Recursive call to build the map
      }
    });
    return parentMap; // Return the parent map
  };

  // Handle checkbox change events
  const handleCheckChange = (node, isChecked) => {
    const parentMap = buildParentMap(treeData); // Build the parent map
    
    updateChildren(node, isChecked); // Update children based on state
    
    updateParents(node, parentMap); // Update parent nodes
    
    setTreeData([...treeData]); // Trigger re-render
  };

  return (
    <div style={{ padding: '20px' }} className='flex flex-col justify-center items-center'>
      {treeData.map((node, index) => (
        <ShowData
          key={index}
          node={node}
          onCheckChange={handleCheckChange}
          margin={0}
        />
      ))}
    </div>
  );
}

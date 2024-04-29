"use client";
import React, { useState } from "react";

const ShowData = ({ node, margin = 10 }) => {
  const [isExpanded, setIsExpanded] = useState({});
  const [isChecked, setIsChecked] = useState({});

  const toggleExpand = (name) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const toggleCheck = (name, checked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    const updateChildrenChecked = (children, checked) => {
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          setIsChecked((prevState) => ({
            ...prevState,
            [`${name}-${child.name}`]: checked,
          }));
          updateChildrenChecked(child.children, checked);
        }
      }
    };

    updateChildrenChecked(node.children, checked);

    const updateParentChecked = (parentName, checked) => {
      if (parentName) {
        const siblings = parentName.split("-").slice(0, -1).join("-");
        const parent = siblings.split("-").pop();

        const allChildrenChecked = node.children.every((child) =>
          isChecked[`${siblings}-${child.name}`]
        );

        setIsChecked((prevState) => ({
          ...prevState,
          [siblings]: allChildrenChecked,
        }));

        updateParentChecked(siblings, checked);
      }
    };

    const parentName = name.split("-").slice(0, -1).join("-");
    updateParentChecked(parentName, checked);
  };

  const renderChild = (children, margin, parentName) => {
    const setData = [];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let childjsx = [];
        childjsx.push(
          <div style={{ marginLeft: `${margin}px` }} key={`${child.name}-${i}`}>
            <div className="text-white border border-cyan-50 rounded-md p-1 m-2 flex items-center">
              <input
                type="checkbox"
                className="mr-3 pt-1 cursor-pointer"
                id={`${parentName}-${child.name}`}
                checked={isChecked[`${parentName}-${child.name}`] || false}
                onChange={(e) =>
                  toggleCheck(`${parentName}-${child.name}`, e.target.checked)
                }
              />
              <div
                className="cursor-pointer"
                onClick={() => toggleExpand(`${parentName}-${child.name}`)}
              >
                {child.name}
              </div>
            </div>
            {isExpanded[`${parentName}-${child.name}`] &&
              renderChild(
                child.children,
                margin + 10,
                `${parentName}-${child.name}`
              )}
          </div>
        );
        setData.push(childjsx);
      }
    }
    return setData;
  };

  return (
    <div>
      <div
        key={node.name}
        className="text-white border border-cyan-50 rounded-md p-1 m-2 flex items-center"
      >
        <input
          type="checkbox"
          className="mr-3 pt-1 cursor-pointer"
          id={node.name}
          checked={isChecked[node.name] || false}
          onChange={(e) => toggleCheck(node.name, e.target.checked)}
        />
        <div className="cursor-pointer" onClick={() => toggleExpand(node.name)}>
          {node.name}
        </div>
      </div>
      {isExpanded[node.name] && (
        <div>{renderChild(node.children, margin, node.name)}</div>
      )}
    </div>
  );
};

export default function RenderComponent() {
  const tree = [
    {
      name: "Parent 1",
      display: true,
      children: [
        {
          name: "Child1",
          display: true,
          children: [
            {
              name: "Grand child 1",
              children: [
                {
                  name: "Grand Grand child 1",
                  display: false,
                  children: [],
                },
                {
                  name: "Grand Grand child 2",
                  display: true,
                  children: [],
                },
                {
                  name: "Grand Grand child 3",
                  display: true,
                  children: [],
                },
              ],
            },
            {
              name: "Grand child 2",
              display: true,
              children: [],
            },
          ],
        },
        {
          name: "Child 2",
          display: true,
          children: [
            {
              name: "Grand child 1",
              display: false,
              children: [
                {
                  name: "Grand Grand child 1",
                  children: [],
                },
              ],
            },
            {
              name: "Grand child 2",
              display: true,
              children: [
                {
                  name: "Grand Grand child 1",
                  display: false,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center mt-4">
      {tree.map((child, index) => (
        <ShowData node={child} key={index} />
      ))}
    </div>
  );
}
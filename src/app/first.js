"use client";
import React, { useState } from "react";

const ShowData = ({ node, margin = 10 }) => {
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const toggle = () => {
    // setShow(!show);
  };

  const handleCheck = (prevState) => {
    setIsChecked((prevState => {
      prevState 
    }))
  }
  return (
    <div style={{ marginLeft: margin, padding: 5, cursor: "pointer" }}>
      {node.display && (
        // <h1
        //   className="border border-cyan-50 p-2 w-64 rounded-md"
        //   onClick={toggle}
        // >
        //   {node.name}
        // </h1>
        <div onClick={toggle} className="border border-cyan-50 p-2 w-64 rounded-md">
          <input  type="checkbox" id="childName" className="mr-2 cursor-pointer" checked={isChecked} onChange={handleCheck}/>
          <label htmlFor="childName">{node.name}</label>
        </div>
      )}
      {!show && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <ShowData
              key={index}
              node={child}
              margin={margin + 10}
              checked={isChecked}
              onChange={handleCheck}
              // className="border border-cyan-50"
              // onClick={(setShow(true))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function First() {
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
          name: "Child2",
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
      {/* { tree.map(value => <h1>{value.name}</h1>)} */}
      {tree.map((child, index) => (
        // <h1>{child.name}</h1>
        <ShowData key={index} node={child} className="text-white" />
      ))}
    </div>
  );
}

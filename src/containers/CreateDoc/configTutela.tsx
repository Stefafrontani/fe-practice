import React from 'react';

// TODO: Remove hardcoded jsx components from here.
export default [
    {
        title: "Name",
        component: <input placeholder="name" />
    },
    {
        title: "Last Name",
        component: <input placeholder="name" />
    },
    {
        title: "Age",
        component: <select>
            <option value="value1">20</option> 
            <option value="value2" selected>30</option>
            <option value="value3">40</option>
        </select>
    },
];
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../assets/images/users/avatar-2.jpg";
import image3 from "../../assets/images/users/avatar-3.jpg";
import image5 from "../../assets/images/users/avatar-5.jpg";

const SearchOption = () => {
    const [value, setValue] = useState("");
    const onChangeData = (value) => {
        setValue(value);
    };
    const [filteredOptions, setFilteredOptions] = useState([]);

    useEffect(() => {
        // Your existing useEffect logic

        // Filter options based on user input
        const filterOptions = () => {
            const filtered = [
                { to: "/dashboard", text: "Dashboard" },
                { to: "/assign-master", text: "Assign Task" },
                { to: "/pages-profile", text: "My account settings" },
                // Add more links as needed
            ].filter(option => option.text.toLowerCase().includes(value.toLowerCase()));

            setFilteredOptions(filtered);
        };

        filterOptions();
    }, [value]);
    useEffect(() => {
        var searchOptions = document.getElementById("search-close-options");
        var dropdown = document.getElementById("search-dropdown");
        var searchInput = document.getElementById("search-options");

        searchInput.addEventListener("focus", function () {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
                dropdown.classList.add("show");
                searchOptions.classList.remove("d-none");
            } else {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });

        searchInput.addEventListener("keyup", function () {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
                dropdown.classList.add("show");
                searchOptions.classList.remove("d-none");
            } else {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });

        searchOptions.addEventListener("click", function () {
            searchInput.value = "";
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
        });

        document.body.addEventListener("click", function (e) {
            if (e.target.getAttribute('id') !== "search-options") {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });
    }, []);

    return (
        <React.Fragment>
            <form className="app-search d-none d-md-block">
                <div className="position-relative" style={{ opacity: 0, pointerEvents: 'none' }}>
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        id="search-options"
                        value={value}
                        onChange={(e) => {
                            onChangeData(e.target.value);
                        }}
                        disabled />
                    <span className="mdi mdi-magnify search-widget-icon"></span>
                    <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                        id="search-close-options"></span>
                </div>
                <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                    <SimpleBar style={{ height: "160px" }}>



                        <div className="dropdown-header mt-2">
                            <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                        </div>


                        <Link to="/dashboard" className="dropdown-item notify-item">
                            <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                            <span>Dashboard</span>
                        </Link>


                        <Link to="/assign-master" className="dropdown-item notify-item">
                            <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                            <span>Assign Task</span>
                        </Link>


                        <Link to="/pages-profile" className="dropdown-item notify-item">
                            <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                            <span>My account settings</span>
                        </Link>






                    </SimpleBar>


                </div>
            </form>
        </React.Fragment>
    );
};

export default SearchOption;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Input } from 'reactstrap';

// const SearchOption = () => {
//   const [value, setValue] = useState('');
//   const options = [
//     { to: '/dashboard', text: 'Dashboard' },
//     { to: '/assign-master', text: 'Assign Task' },
//     { to: '/pages-profile', text: 'My account settings' },
//     // Add more links as needed
//   ];

//   const filteredOptions = options.filter(option =>
//     option.text.toLowerCase().includes(value.toLowerCase())
//   );

//   const clearSearch = () => {
//     setValue('');
//   };

//   return (
//     <React.Fragment>
//       <form className="app-search d-none d-md-block">
//         <div className="position-relative">
//           <Input
//             type="text"
//             className="form-control"
//             placeholder="Search..."
//             id="search-options"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//           />
//           <span className="mdi mdi-magnify search-widget-icon"></span>
//           {value && (
//             <span
//               className="mdi mdi-close-circle search-widget-icon search-widget-icon-close"
//               id="search-close-options"
//               onClick={clearSearch}
//             ></span>
//           )}
//         </div>
//         {filteredOptions.length > 0 && (
//           <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
//             <div className="dropdown-header mt-2">
//               <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
//             </div>
//             {filteredOptions.map((option, index) => (
//               <Link key={index} to={option.to} className="dropdown-item notify-item">
//                 <span>{option.text}</span>
//               </Link>
//             ))}
//           </div>
//         )}
//       </form>
//     </React.Fragment>
//   );
// };

// export default SearchOption;


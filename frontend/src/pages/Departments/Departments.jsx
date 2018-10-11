import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Spinner from "../../components/UI/Spinner/Spinner";
import Table from "../../components/Table/Table";
import classes from "./Departments.css";

const LIST_DEPARTMENTS = gql`
    query {
        listDepartments {
            cols {
                name
                title
                defaultContent
                sortOrder
                sortDirection
                frontendFormatter
                html
            }
            rows {
                d_id
                d_title
                d_head
                d_size
                d_created
            }
        }
    }
`;

const Departments = () => (
    <Query query={LIST_DEPARTMENTS}>
        {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) throw error;

            return (
                <div className={classes.TableContainer}>
                    <Table
                        title="Departments"
                        selectable={true}
                        emptyTableMessage="No departments found"
                        {...data.listDepartments}
                    />
                </div>
            );
        }}
    </Query>
);

export default Departments;

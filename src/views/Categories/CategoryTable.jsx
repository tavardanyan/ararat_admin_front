import React from 'react';

class CategoryTable extends React.Component {
    render() {
        return (
            <IconCard
                icon={Assignment}
                iconColor="rose"
                content={
                <Table
                    tableHead={[
                    "#",
                    "Name",
                    "Job Position",
                    "Since",
                    "Salary",
                    "Actions"
                    ]}
                    tableData={[
                    [
                        "1",
                        "Andrew Mike",
                        "Develop",
                        "2013",
                        "€ 99,225",
                        fillButtons
                    ],
                    ["2", "John Doe", "Design", "2012", "€ 89,241", roundButtons],
                    [
                        "3",
                        "Alex Mike",
                        "Design",
                        "2010",
                        "€ 92,144",
                        simpleButtons
                    ],
                    [
                        "4",
                        "Mike Monday",
                        "Marketing",
                        "2013",
                        "€ 49,990",
                        roundButtons
                    ],
                    [
                        "5",
                        "Paul Dickens",
                        "Communication",
                        "2015",
                        "€ 69,201",
                        fillButtons
                    ]
                    ]}
                    customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                    ]}
                    customClassesForCells={[0, 4, 5]}
                    customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right
                    ]}
                    customHeadClassesForCells={[0, 4, 5]}
                />
                }
            />
        )
    }
}

export default CategoryTable;
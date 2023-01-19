<?php
function DisplayAll($stmt, $rows)
{
    echo "
    <div class='box'>
        <h1>Display All</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>";

    foreach ($rows as $key => $row) {
        echo "
                <tr>
                    <td>{$row["id"]}</td>
                    <td>{$row["name"]}</td>
                    <td>{$row["code"]}</td>
                </tr>";
    }
    echo "
            </tbody>
            <tfoot>
                <tr>
                    <td colspan=3>" .
        "There are " . $stmt->rowCount() . " rows" . "
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    ";
}

function DisplayJoin($stmt, $rows)
{
    echo "
    <div class='box'>
        <h1>Display Join</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>";

    foreach ($rows as $key => $row) {
        echo "
                <tr>
                    <td>{$row["referencedId"]}</td>
                    <td>{$row["name"]}</td>
                    <td>{$row["city"]}</td>
                </tr>";
    }
    echo "
            </tbody>
            <tfoot>
                <tr>
                    <td colspan=3>" .
        "There are " . $stmt->rowCount() . " rows" . "
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    ";
}

function DisplayRow($stmt, $row)
{
    echo "
    <div class='box'>
        <h1>Display 1 Row</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Code</th>
                </tr>
            </thead>
            <tbody>";

    echo "
                <tr>
                    <td>{$row["id"]}</td>
                    <td>{$row["name"]}</td>
                    <td>{$row["code"]}</td>
                </tr>";

    echo "
            </tbody>
            <tfoot>
                <tr>
                    <td colspan=3>" .
        "There are " . $stmt->rowCount() . " rows" . "
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
    ";
}

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


/**
 * HighScore Board - yet to be implemented obviously
 * @component
 */

const HighScore = (props) => {
    const [highScoreTable, setHighScoreTable] = useState(() => []);
    const highScores = props.highScores;

    useEffect(() => {
        setHighScoreTable(() => {
            return (
                <table id='highScoreTable'>
                    <tbody>
                        {highScores.map((e, i) => {
                            return (
                                <tr key={uuidv4()}>
                                    <td className="highScoreName">{`${i + 1} - ${e.name}`}</td>
                                    <td className="highScoreScore">{e.score}</td>
                                </tr>)}
                            )
                        }
                    </tbody>
                </table>
            )
        });
    }, [highScores]);
    



    return (
        <div>
            <h1>High Scores</h1>
            {highScoreTable}
            
        </div>
    );
}


export { HighScore };
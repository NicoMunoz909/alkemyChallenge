import styles from './moves.module.css'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DeleteModal from '../DeleteModal';

const Moves = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [moves, setMoves] = useState([]);
  const [selectedMoves, setSelectedMoves] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMove, setSelectedMove] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setMoves(data);
      setSelectedMoves(data);
    })
  }, [location]);

  const filterMoves = (type) => {
    if (type === 'All') {
      setSelectedMoves(moves);
    } else {
      setSelectedMoves(moves.filter(move => move.type === type));
    }
  }

  const handleDelete = (e, move) => {
    e.stopPropagation();
    setSelectedMove(move);
    setShowDelete(true);
  }

  const deleteMove = (move) => {
    fetch(`http://localhost:5000/${move.id}`, {method: 'DELETE'})
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json()
      }
      setMoves(moves.filter((op) => {return op.id !== move.id}));
      setSelectedMoves(selectedMoves.filter((op) => {return op.id !== move.id}));
    })
    setMoves(moves.filter((op) => {return op.id !== move.id}));
    setSelectedMoves(selectedMoves.filter((op) => {return op.id !== move.id}));
    setShowDelete(false);
  }

  return (
    <div className={styles.container}>
      <Outlet />
      {showDelete && <DeleteModal onCancel={() => setShowDelete(false)} onConfirm={() => deleteMove(selectedMove)} />}
      <h2>Moves</h2>
      <div className={styles.controlsContainer}>
        <div>
          <label htmlFor="filter">Show:</label>
          <select className={styles.filter} name='filter' onChange={(e) => filterMoves(e.target.value)}>
            <option>All</option>
            <option>Expenditure</option>
            <option>Income</option>
          </select>
        </div>
        <button className={styles.addBtn} onClick={() => navigate(`${location.pathname}/new`)}>
          Add Move
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedMoves.map(move => {
              return(
              <tr key={move.id}>
                <td>{move.concept}</td>
                <td>${move.amount}</td>
                <td>{move.date.substring(0, move.date.indexOf('T'))}</td>
                <td>{move.type}</td>
                <td>
                  <button className={styles.tableBtn} onClick={() => navigate(`${location.pathname}/${move.id}`)}><FaEdit></FaEdit></button>
                  <button className={styles.tableBtn} onClick={(e) => {handleDelete(e, move)}}><FaTimes></FaTimes></button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Moves
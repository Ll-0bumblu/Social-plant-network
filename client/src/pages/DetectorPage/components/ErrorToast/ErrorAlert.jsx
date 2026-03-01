import './ErrorAlert.css'

function ErrorAlert({ error }) {
  return (
    <div style={{
          position: "absolute",
          top: "-25px",
          right: "50%",
          transform: 'translateX(50%)',
          backgroundColor: '#ffebee',
          border: '1px solid #ef5350',
          borderLeft: '1px solid #f44336',
          color: '#c62828',
          padding: '12px 16px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '500' }}>{error}</span>
          </div>
      </div>
  );
}

export default ErrorAlert

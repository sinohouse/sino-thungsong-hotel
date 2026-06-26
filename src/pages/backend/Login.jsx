import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { KeyRound, User, AlertTriangle } from 'lucide-react';

export default function Login() {
  const { login, currentUser } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page" style={{ paddingTop: '150px', pb: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '420px', width: '100%', padding: '20px' }}>
        <div style={{ backgroundColor: '#181822', border: '1px solid rgba(226,192,119,0.2)', borderRadius: '20px', padding: '40px', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span style={{ fontSize: '13px', color: '#e2c077', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>MANAGEMENT SYSTEM</span>
            <h2 style={{ color: '#fff', fontSize: '24px', marginTop: '5px' }}>เข้าสู่ระบบหลังบ้าน</h2>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#e2c077" />
                <span>ชื่อผู้ใช้งาน</span>
              </label>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="ระบุบัญชีผู้ใช้" 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={14} color="#e2c077" />
                <span>รหัสผ่าน</span>
              </label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="ระบุรหัสผ่าน" 
              />
            </div>

            {error && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(217,43,43,0.1)', border: '1px solid rgba(217,43,43,0.3)', padding: '12px 15px', borderRadius: '8px', color: '#d92b2b', fontSize: '13px' }}>
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-accent btn-block btn-large">เข้าสู่ระบบ</button>
          </form>

          {/* Helper details to help testing */}
          <div style={{ marginTop: '25px', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', fontSize: '12px', color: '#a1a1b5', border: '1px solid rgba(255,255,255,0.05)' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>บัญชีสำหรับทดลองระบบหลังบ้าน:</strong>
            <p>• Super Admin: User = <code>admin</code> / Password = <code>admin123</code></p>
            <p>• Receptionist: User = <code>reception</code> / Password = <code>rec123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

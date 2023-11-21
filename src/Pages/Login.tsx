import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setUser} from '../app/actions'
import { useNavigate } from 'react-router-dom';

interface UserData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    
    axios.get(`/Users/user.json`)
    .then((response) => {
      setUserData(response.data);
      dispatch(setUser(userData));
      })

    .catch((error) => {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    });
    
  }, [userData]); // 마운트될 때 한 번만 실행

  const handleLoginEmail = (e:any) => {
      setEmail(e.target.value);
  };

  const handleLoginPw = (e: any) => {
      setPassword(e.target.value);
  };

  const handleLogin = () => {
    
    // userData가 배열이므로 배열의 각 요소에 접근하여 로그인 여부 확인
    if(userData){
    
      for (let i = 0; i < userData.length; i++) {
        const currentUser = userData[i];
        // 현재 사용자의 이메일과 비밀번호를 확인하여 로그인 여부 판단
        if (currentUser.email === loginEmail && currentUser.password === loginPassword) {
          console.log('로그인 성공');
          alert('로그인 성공');
          navigate("/home");
          return;
        }
      }
    }

    // for 루프를 다 돌았는데도 로그인이 실패한 경우
    console.log('로그인 실패');
    alert('아이디와 비밀번호를 확인해주세요');
  };

  return (
    
    <div className="flex items-center justify-center h-screen">
      <img src="data:image/jpeg;base64,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" alt="" className="w-64 h-64"  />
      <form className="w-1/2 p-8 bg-white-200">
        <h2 className="text-2xl text-center font-bold mb-4">LOG IN</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">이메일</label>
          <input
            type="email"
            placeholder="Type here"
            className="input-bordered input-info mt-1 p-2 w-full border rounded"
            value={loginEmail}
            onChange={handleLoginEmail}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">비밀번호</label>
          <input
            type="password"
            placeholder="Type here"
            className="input-bordered input-info mt-1 p-2 w-full border rounded"
            value={loginPassword}
            onChange={handleLoginPw}
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-800 text-white p-2 rounded" onClick={handleLogin}>
          로그인
        </button>
        
        <div className="text-blue-900 text-center mt-8 font-semibold text-xl">
        <span className="text-gray-600 mr-2">에부기타임이 처음이신가요?</span>
        <Link to="/register" className="text-blue-800">
          회원가입
        </Link>
      </div>
      </form>  
    </div>
  );
};

export default Login;
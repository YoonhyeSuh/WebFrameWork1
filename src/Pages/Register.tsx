import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//json 파일에 데이터를 쓰는거 필요

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);
  }

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNickname = e.target.value;
    setNickName(inputNickname);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  }

  //유효성 검사
  const isValidInput = name.length >= 1 && nickname.length >= 1;
  const isEmailValid = email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const pwNumLetter = password.search(/[0-9]/g);
  const pwEngLetter = password.search(/[a-z]/ig);
  const isValidPassword = password.length >= 8 && password.length <= 20 &&
    ( (pwNumLetter >= 1 && pwEngLetter >= 1));

  const handleSignUp = async () => {
    if (!isValidInput || !isValidPassword || !isEmailValid)
      alert('정확히 입력되었는지 다시 확인해주세요.');
    else{  
    try {
      // 이메일과 비밀번호 가져오기
      const r_name = name;
      const r_email = email;
      const r_password = password;
      const r_nickname = nickname;
  
      // 기존 사용자 목록 가져오기
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      // 새로운 사용자 정보 생성
      const newUser = { r_nickname, r_name, r_email, r_password };
  
      // 기존 사용자 목록에 새로운 사용자 추가
      users.push(newUser);
  
      // 사용자 정보를 localStorage에 저장
      localStorage.setItem('users', JSON.stringify(users));
  
      console.log('회원가입 성공');
      alert('회원가입 성공')
      navigate("/login");
    } catch (error: any) {
      console.error('회원가입 오류:', error.message);
      alert('회원가입 오류')
    }
  }
    
  };
  

  const getUsers = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  console.log(getUsers());
  
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-1/3 p-8 bg-white-200">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">이름</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">닉네임</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">이메일</label>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">비밀번호</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" onClick={handleSignUp}>
            Sign up  
        </button>
      </form>
    </div>
  );
}

export default Register;
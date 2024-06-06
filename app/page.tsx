'use client';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

// Component for individual post
const Post = ({ post, onLike, onComment, onRepost }) => {
    const buttonStyle = {
        width: '100px',
        padding: '10px',
        backgroundColor: '#ffc729',
        color: '#02183b',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            width: '100%',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
            {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: '10px' }} />}
            <p style={{ marginTop: '10px' }}>{post.text}</p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
                <button onClick={onLike} style={buttonStyle}>Curtir ({post.likes})</button>
                <button onClick={onComment} style={buttonStyle}>Comentar ({post.comments.length})</button>
                <button onClick={onRepost} style={buttonStyle}>Republicar</button>
            </div>
        </div>
    );
};

// Component for list of posts
const PostList = () => {
    const initialPosts = [
        {
            id: 1,
            image: './post1.jpg',
            text: 'Este é um post de exemplo com imagem.',
            likes: 0,
            comments: [],
        },
        {
            id: 2,
            image: null,
            text: 'Este é um post de exemplo sem imagem.',
            likes: 0,
            comments: [],
        }
    ];

    const [posts, setPosts] = useState(initialPosts);

    const handleLike = (id) => {
        setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
    };

    const handleComment = (id) => {
        const comment = prompt('Digite seu comentário:');
        if (comment) {
            setPosts(posts.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post));
        }
    };

    const handleRepost = (id) => {
        const postToRepost = posts.find(post => post.id === id);
        setPosts([{ ...postToRepost, id: posts.length + 1 }, ...posts]);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px', // Ajuste a margem superior conforme necessário
            width: '80%'
        }}>
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onComment={() => handleComment(post.id)}
                    onRepost={() => handleRepost(post.id)}
                />
            ))}
        </div>
    );
};

const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        alert(`Pesquisando por: ${searchQuery}`);
    };

    const handlePagePrincipalClick = () => {
        navigate('/posts');
    };

    return (
        <div style={{
            height: '100%',
            width: '200px',
            position: 'fixed',
            top: '0',
            left: '0',
            backgroundColor: 'purple',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
        }}>
            <button style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                width: '50px',
                height: '50px',
                backgroundColor: '#ffc729',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: '0',
            }} onClick={() => alert('Perfil clicado!')}>
                <img src="./perfil.png" alt="Perfil" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                }} />
            </button>

            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{
                    width: '80%',
                    position: 'relative',
                    marginBottom: '20px'
                }}>
                    <input type="text" placeholder="Pesquisar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            paddingRight: '40px',
                            border: 'none',
                            borderRadius: '5px',
                            outline: 'none'
                        }} />
                    <button onClick={handleSearch} style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0'
                    }}>
                        <img src="./Lupa.png" alt="Lupa" style={{
                            width: '30px',
                            height: 'auto'
                        }} />
                    </button>
                </div>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '20px',
            }}>
                <button style={{
                    width: '80%',
                    padding: '10px',
                    margin: '10px 0',
                    backgroundColor: '#ffc729',
                    color: '#02183b',
                    border: 'none',
                    borderRadius: '5px'
                }} onClick={handlePagePrincipalClick}>Página Principal</button>
                <button style={{
                    width: '80%',
                    padding: '10px',
                    margin: '10px 0',
                    backgroundColor: '#ffc729',
                    color: '#02183b',
                    border: 'none',
                    borderRadius: '5px'
                }} onClick={() => alert('Notificações clicado!')}>Notificações</button>
            </div>
        </div>
    );
}

const MainContent = () => {
    const buttonStyle = {
        width: '150px',
        height: '50px',
        padding: '10px',
        backgroundColor: '#ffc729',
        color: '#02183b',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div className="w-screen h-screen bg-[#001638] flex flex-col items-center justify-center p-10 relative">
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <img src="./WaveConnect.jpg" alt="WaveConnect" style={{ width: '200px', height: 'auto', marginLeft: "200px" }} />
            </div>
            <div className="text-[#ffc729] text-6xl" style={{ marginTop: '-470px', marginRight: '-200px' }}>
                Bem-Vindos!
            </div>
            <div style={{
                position: 'absolute',
                bottom: '450px',
                right: '555px',
                display: 'flex',
                gap: '20px'
            }}>
                <button style={buttonStyle} onClick={() => alert('Login clicado!')}>Login</button>
                <button style={buttonStyle} onClick={() => alert('Cadastro clicado!')}>Cadastro</button>
            </div>
        </div>
    );
}

const PostsPage = () => {
    return (
        <div className="w-screen h-screen bg-[#001638] flex flex-col items-center justify-center p-10 relative">
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <img src="./WaveConnect.jpg" alt="WaveConnect" style={{ width: '200px', height: 'auto', marginLeft: "200px" }} />
            </div>
            <PostList />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/posts" element={<PostsPage />} />
            </Routes>
        </Router>
    );
}

export default App;

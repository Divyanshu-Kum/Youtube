# YouTube Clone - Full Stack Application

A complete YouTube-like video sharing platform with a React TypeScript frontend and Node.js backend API. Users can register, login, upload videos, and browse content in a modern, responsive interface.

## 🚀 Features

### Frontend (React + TypeScript)
- **Modern UI**: Clean, responsive design similar to YouTube
- **User Authentication**: Login/Register modal system
- **Video Upload**: Modal-based video upload with thumbnails
- **Video Grid**: Display videos in a responsive grid layout
- **Video Player**: Custom video player component
- **Real-time Data**: Custom hooks for fetching video data
- **Date Formatting**: Utility functions for displaying video upload dates

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for users and videos
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Video and image upload to Cloudinary
- **Password Security**: Bcrypt hashing for user passwords
- **Database**: MongoDB with Mongoose ODM
- **Protected Routes**: Middleware for route authorization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Backend Integration**: Supabase client (for additional features)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Password Hashing**: bcrypt
- **File Upload**: express-fileupload

## 📁 Project Structure

```
Youtube/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── AuthModal.tsx         # Login/Register modal
│   │   ├── Header.tsx            # Navigation header
│   │   ├── UploadModal.tsx       # Video upload modal
│   │   ├── VideoCard.tsx         # Individual video card
│   │   ├── VideoGrid.tsx         # Grid layout for videos
│   │   └── VideoPlayer.tsx       # Video player component
│   ├── hooks/
│   │   └── useVideos.tsx         # Custom hook for video data
│   ├── utils/
│   │   └── dateUtils.ts          # Date formatting utilities
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles
├── api/                          # Backend middleware
│   └── middleware/
│       └── checkAuth.js          # JWT authentication middleware
├── models/                       # Database models
│   ├── User.js                   # User schema
│   └── Video.js                  # Video schema
├── routes/                       # API routes
│   ├── user.js                   # User authentication routes
│   └── video.js                  # Video CRUD routes
├── app.js                        # Express app configuration
├── server.js                     # Server entry point
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Cloudinary account for file storage

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Divyanshu-Kum/Youtube.git
   cd Youtube
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```
   Backend runs on `http://localhost:3000`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes
- `POST /user/signup` - Register new user
- `POST /user/login` - User login

### Video Routes (Protected)
- `POST /video/upload` - Upload new video
- `PUT /video/:videoId` - Update video
- `DELETE /video/:videoId` - Delete video

## 🎨 Frontend Components

### Core Components

#### `App.tsx`
Main application component that orchestrates the entire frontend application.

#### `Header.tsx`
Navigation header with authentication buttons and upload functionality.

#### `AuthModal.tsx`
Modal component handling user login and registration with form validation.

#### `UploadModal.tsx`
Modal for uploading videos with metadata (title, description, thumbnail).

#### `VideoGrid.tsx`
Responsive grid layout displaying video cards with pagination support.

#### `VideoCard.tsx`
Individual video card component showing thumbnail, title, and metadata.

#### `VideoPlayer.tsx`
Custom video player with controls and responsive design.

### Custom Hooks

#### `useVideos.tsx`
Custom React hook for:
- Fetching video data from API
- Managing loading states
- Handling video upload operations
- Real-time data updates

### Utilities

#### `dateUtils.ts`
Utility functions for formatting video upload dates and timestamps.

## 🔐 Authentication Flow

1. User registers/logs in via `AuthModal`
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage/sessionStorage
4. Protected routes use `checkAuth` middleware
5. Frontend includes token in API requests

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Responsive video player
- Touch-friendly interface
- Cross-browser compatibility

## 🔧 Development Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm start            # Start production server
npm run dev          # Start with nodemon (if configured)
```

## 🌐 Deployment

### Backend Deployment
1. Set up MongoDB Atlas for database
2. Configure Cloudinary for file storage
3. Deploy to services like Heroku, Railway, or DigitalOcean
4. Set environment variables in production

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Configure environment variables for production API

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Form validation on frontend
- API request/response validation
- File upload validation
- Authentication state management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Divyanshu Kumar**
- GitHub: [@Divyanshu-Kum](https://github.com/Divyanshu-Kum)
- Project: [YouTube Clone](https://github.com/Divyanshu-Kum/Youtube)

## 🙏 Acknowledgments

- YouTube for design inspiration
- React and TypeScript communities
- MongoDB and Cloudinary for excellent services
- All contributors and supporters

---

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the development team

**Happy Coding! 🎉**
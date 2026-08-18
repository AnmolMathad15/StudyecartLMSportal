import {
  User,
  Course,
  Quiz,
  Doubt,
  Assignment,
  LiveClass,
  Certificate,
  NotificationItem,
  Category,
  ActivityLog,
  Announcement
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-instructor-1',
    name: 'Dr. Aris',
    email: 'dr.aris@studyecart.edu',
    role: 'INSTRUCTOR',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    title: 'Senior Mentor & Lead Researcher',
    department: 'Computer Science & Mathematics',
    bio: 'Over 12 years of academic mentorship and industrial data science experience specializing in algorithmic design and machine learning.',
    joinedDate: '2022-03-15',
    status: 'ACTIVE'
  },
  {
    id: 'user-student-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@student.studyecart.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Data Science Undergraduate',
    department: 'School of Engineering',
    bio: 'Passionate student exploring deep learning, probabilistic computing, and linear algebra applications.',
    joinedDate: '2024-01-10',
    status: 'ACTIVE'
  },
  {
    id: 'user-student-2',
    name: 'Mike Turner',
    email: 'mike.t@student.studyecart.com',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Applied Math Major',
    department: 'School of Mathematics',
    bio: 'Enthusiast in linear algebra optimizations and competitive coding.',
    joinedDate: '2024-02-01',
    status: 'ACTIVE'
  },
  {
    id: 'user-admin-1',
    name: 'Admin Controller',
    email: 'admin@studyecart.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Head of Academic Operations',
    department: 'StudyEcart Operations Directorate',
    bio: 'Oversees platform governance, mentor onboarding, quality compliance, and institutional curricula.',
    joinedDate: '2021-08-01',
    status: 'ACTIVE'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-ds',
    name: 'Data Science & AI',
    iconName: 'database',
    courseCount: 14,
    description: 'Master Python, Machine Learning, Neural Networks, and Big Data pipelines.'
  },
  {
    id: 'cat-math',
    name: 'Mathematics & Algorithms',
    iconName: 'calculator',
    courseCount: 9,
    description: 'Rigorous foundations in Calculus, Linear Algebra, Probability, and Discrete Math.'
  },
  {
    id: 'cat-cs',
    name: 'Software Engineering',
    iconName: 'code',
    courseCount: 22,
    description: 'Full-stack development, Spring Boot, React, Microservices, and Cloud Native design.'
  },
  {
    id: 'cat-cloud',
    name: 'Cloud & DevOps',
    iconName: 'cloud',
    courseCount: 8,
    description: 'Kubernetes, Docker containerization, AWS, CI/CD automation, and Observability.'
  },
  {
    id: 'cat-security',
    name: 'Cybersecurity & Networks',
    iconName: 'shield',
    courseCount: 6,
    description: 'Ethical hacking, cryptographic protocols, defense in depth, and network security.'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ds-101',
    title: 'Python for Data Science & Machine Learning',
    subtitle: 'From zero to predictive models using Pandas, NumPy, Scikit-Learn, and PyTorch.',
    description: 'A comprehensive, industry-aligned pathway into data manipulation, exploratory analysis, hypothesis testing, and building supervised/unsupervised machine learning models.',
    category: 'Data Science & AI',
    level: 'Intermediate',
    language: 'English',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqK_khl8tE99fyNVYeu1qNwEwdNoUwWNsUOW_FhEP0O3PsnmiQaqG3BfM67ikX_aQJppx9HvUE3FAAdb5hXIiBRsYVDVqRM9dWqpYXoQqxomWgL7HH0b39egnBjl0wU-qyGuA4m_RGYR3_EDvDZ5hHqXhCIn-my52ex5kHhVmn3Kz7KePQyHBEwL1Fh9YqVi56Agsgotn-gJZ31BC2WdHOPbg2zSykckheHNrb8VUVXV8hZiOkmCDSyA',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch B2',
    rating: 4.9,
    reviewCount: 342,
    enrolledStudents: 284,
    syllabusCompletion: 75,
    price: 149,
    originalPrice: 299,
    duration: '18 Weeks',
    totalLessons: 42,
    published: true,
    status: 'PUBLISHED',
    featured: true,
    certificateEligible: true,
    targetAudience: ['Data Analysts', 'Aspiring ML Engineers', 'Software Developers'],
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'PyTorch', 'Model Evaluation'],
    requirements: [
      'Basic programming understanding in any high-level language',
      'Comfortable with high school algebra and functions',
      'A computer with Python 3.10+ or Google Colab access'
    ],
    learningOutcomes: [
      'Master data structures in Pandas and multi-dimensional matrix operations in NumPy',
      'Build end-to-end regression, classification, and clustering ML pipelines',
      'Evaluate predictive accuracy with confusion matrices, ROC-AUC curves, and F1 metrics',
      'Deploy inference APIs and interactive dashboards with Streamlit'
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-10-20',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Scientific Python',
        description: 'Deep dive into array broadcasting, memory layouts, and vectorization.',
        duration: '3 hours 45 mins',
        lessons: [
          {
            id: 'les-1-1',
            title: '1.1 Introduction to NumPy Vectors and Memory Layouts',
            duration: '25 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Understand strides, C-contiguous arrays, and memory efficiency in multidimensional tensor calculations.',
            completed: true,
            resources: [
              { name: 'numpy_broadcasting_cheatsheet.pdf', size: '1.8 MB', url: '#' },
              { name: 'lesson1_interactive_notebook.ipynb', size: '420 KB', url: '#' }
            ]
          },
          {
            id: 'les-1-2',
            title: '1.2 Advanced Indexing and Slicing Techniques',
            duration: '32 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Boolean masking, fancy indexing, zero-copy views, and array reshaping mechanics.',
            completed: true,
            resources: [
              { name: 'indexing_exercises.py', size: '24 KB', url: '#' }
            ]
          },
          {
            id: 'les-1-3',
            title: '1.3 Hands-on Lab: High-Performance Vectorization',
            duration: '45 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'Benchmark standard Python loops against SIMD vectorized NumPy calls and multithreaded BLAS routines.',
            completed: true,
            resources: [
              { name: 'vectorization_benchmark.ipynb', size: '510 KB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Exploratory Data Analysis & Feature Engineering',
        description: 'Clean missing values, handle categorical variables, and generate statistical distributions.',
        duration: '4 hours 10 mins',
        lessons: [
          {
            id: 'les-2-1',
            title: '2.1 Missing Value Imputation Strategies',
            duration: '28 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            content: 'KNN imputation, iterative estimators, and domain-informed handling of missing data points.',
            completed: true,
            resources: [
              { name: 'imputation_strategies_summary.pdf', size: '1.2 MB', url: '#' }
            ]
          },
          {
            id: 'les-2-2',
            title: '2.2 Categorical Encoding: Target vs One-Hot Encoding',
            duration: '35 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            content: 'Prevent target leakage when training categorical models on high-cardinality features.',
            completed: true,
            resources: [
              { name: 'encoding_pipelines.py', size: '18 KB', url: '#' }
            ]
          },
          {
            id: 'les-2-3',
            title: '2.3 Feature Scaling & Normalization Pipelines',
            duration: '26 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            content: 'StandardScaler, RobustScaler, and QuantileTransformer with scikit-learn Pipeline integrations.',
            completed: false,
            resources: [
              { name: 'scaling_comparison.ipynb', size: '340 KB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Supervised Learning & Gradient Descent',
        description: 'Formulate cost functions, analytical vs numerical gradient computation, and regularizations.',
        duration: '5 hours 20 mins',
        lessons: [
          {
            id: 'les-3-1',
            title: '3.1 Mathematical Derivation of Ordinary Least Squares',
            duration: '40 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            content: 'Deriving the normal equation (X^T X)^-1 X^T y and understanding matrix condition numbers.',
            completed: false,
            resources: [
              { name: 'ols_derivation_notes.pdf', size: '2.4 MB', url: '#' }
            ]
          },
          {
            id: 'les-3-2',
            title: '3.2 Stochastic vs Batch vs Mini-batch Gradient Descent',
            duration: '38 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            content: 'Momentum, Adam optimizers, and adaptive learning rate decay schedules.',
            completed: false,
            resources: [
              { name: 'optimizers_sandbox.py', size: '32 KB', url: '#' }
            ]
          },
          {
            id: 'les-3-3',
            title: '3.3 Regularization: Ridge (L2), Lasso (L1) & ElasticNet',
            duration: '44 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            content: 'Constrained optimization geometry, sparsity induction in Lasso, and cross-validated alpha tuning.',
            completed: false,
            resources: [
              { name: 'regularization_visualizer.ipynb', size: '620 KB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-calc-201',
    title: 'Advanced Calculus & Linear Algebra',
    subtitle: 'Vector spaces, eigenvalues, matrix decompositions, and multivariable optimization.',
    description: 'Designed specifically for computer scientists, AI engineers, and quantitative analysts. Master orthogonal projections, Singular Value Decomposition (SVD), Hessian matrices, and constrained optimization.',
    category: 'Mathematics & Algorithms',
    level: 'Advanced',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIiAM9qrfbK7U3HWOHR6o_cR7LwskQ1VRmhvU84_X8OSsW1nTfJGwButZCeq1SZcTjo8OsBCzioyPG4RzRfwBz0xlATbYrYBpQtdJGzqiPKLS1tD1mb3kZ-o8E2F29mLcv7Ha44tZypBVWGA8caW2RZgxPTCFOoSw9-JicJYa58QUKZIyuHA7JrTiYReQ72YLPQ1o8S1olfUXWc_hlSktaYakjw6C_8d_2TbiNyvGvcVIsEl7TfVvfFw',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch A1',
    rating: 4.95,
    reviewCount: 198,
    enrolledStudents: 142,
    syllabusCompletion: 40,
    price: 129,
    originalPrice: 249,
    duration: '14 Weeks',
    totalLessons: 36,
    published: true,
    status: 'PUBLISHED',
    featured: true,
    certificateEligible: true,
    requirements: [
      'Single variable differential and integral calculus',
      'Basic matrix multiplication and linear systems'
    ],
    learningOutcomes: [
      'Understand spectral theorem and compute eigenvalue/eigenvector decompositions',
      'Formulate Principal Component Analysis (PCA) through geometric projections',
      'Solve multivariable optimization using Lagrange multipliers and KKT conditions'
    ],
    createdAt: '2024-02-10',
    updatedAt: '2024-10-18',
    modules: [
      {
        id: 'calc-mod-1',
        title: 'Module 1: Vector Spaces and Linear Subspaces',
        duration: '4 hours',
        lessons: [
          {
            id: 'calc-les-1-1',
            title: '1.1 Linear Independence, Span, and Basis Formulations',
            duration: '35 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            content: 'Rigorous geometric proofs of linear independence, subspace closure axioms, and dimension theorems.',
            completed: true,
            resources: [
              { name: 'vector_spaces_proof_guide.pdf', size: '2.1 MB', url: '#' }
            ]
          },
          {
            id: 'calc-les-1-2',
            title: '1.2 Gram-Schmidt Orthogonalization & QR Factorization',
            duration: '45 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            content: 'Inner product spaces, projection operators, and numerically stable QR decompositions.',
            completed: true,
            resources: [
              { name: 'gram_schmidt_algorithm.py', size: '14 KB', url: '#' }
            ]
          },
          {
            id: 'calc-les-1-3',
            title: '1.3 Orthogonal Projections and Least-Squares Approximation',
            duration: '38 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            content: 'Geometric projection matrices P = A(A^T A)^-1 A^T and fundamental theorem of linear algebra.',
            completed: false,
            resources: [
              { name: 'projections_problem_set.pdf', size: '1.5 MB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'calc-mod-2',
        title: 'Module 2: Matrix Decompositions & SVD',
        duration: '5 hours 30 mins',
        lessons: [
          {
            id: 'calc-les-2-1',
            title: '2.1 Eigenvalues, Eigenvectors and Diagonalization',
            duration: '50 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Characteristic polynomials, algebraic vs geometric multiplicity, and symmetric matrix spectral theorem.',
            completed: false,
            resources: [
              { name: 'eigen_analysis_cheatsheet.pdf', size: '1.9 MB', url: '#' }
            ]
          },
          {
            id: 'calc-les-2-2',
            title: '2.2 Singular Value Decomposition (SVD) and Low-Rank Approximations',
            duration: '55 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Eckart-Young-Mirsky theorem, image compression, pseudoinverses, and PCA geometry.',
            completed: false,
            resources: [
              { name: 'svd_image_compressor.ipynb', size: '820 KB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-dsa-301',
    title: 'Data Structures 101: Master Algorithmic Thinking',
    subtitle: 'Master trees, graphs, dynamic programming, and complexity analysis.',
    description: 'An exhaustive roadmap for technical interview prep and computer systems fundamentals. Complete with live coding labs, automated tests, and real-time mentor breakdowns.',
    category: 'Software Engineering',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc15c0e1832?w=800&auto=format&fit=crop&q=80',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch B2',
    rating: 4.88,
    reviewCount: 512,
    enrolledStudents: 410,
    syllabusCompletion: 90,
    price: 99,
    originalPrice: 199,
    duration: '12 Weeks',
    totalLessons: 50,
    published: true,
    status: 'PUBLISHED',
    featured: true,
    certificateEligible: true,
    requirements: ['Any programming language basics (C++, Java, or Python)'],
    learningOutcomes: [
      'Analyze asymptotic time and space complexities (Big-O, Big-Omega)',
      'Implement balanced Binary Search Trees, AVL Trees, and Red-Black Trees',
      'Solve graph problems using Dijkstra, Bellman-Ford, and Topological Sort'
    ],
    createdAt: '2023-11-05',
    updatedAt: '2024-10-22',
    modules: [
      {
        id: 'dsa-mod-1',
        title: 'Module 1: Binary Trees and Recursive Traversals',
        duration: '3 hours 15 mins',
        lessons: [
          {
            id: 'dsa-les-1-1',
            title: '1.1 Intro to Binary Trees and Node Pointer Representations',
            duration: '30 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            content: 'Tree taxonomy, height invariants, recursive definition, and memory footprint in heap allocations.',
            completed: true,
            resources: [
              { name: 'binary_tree_implementation.cpp', size: '12 KB', url: '#' }
            ]
          },
          {
            id: 'dsa-les-1-2',
            title: '1.2 Inorder, Preorder, Postorder & Level-Order BFS Traversals',
            duration: '40 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            content: 'Iterative stack simulation vs recursive call frames, queue-based level order traversals, and zigzag patterns.',
            completed: true,
            resources: [
              { name: 'traversal_templates.py', size: '16 KB', url: '#' }
            ]
          },
          {
            id: 'dsa-les-1-3',
            title: '1.3 Binary Search Trees: Insertion, Deletion & AVL Rotations',
            duration: '48 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            content: 'BST invariants, predecessor/successor replacements, and balancing via left/right rotation passes.',
            completed: false,
            resources: [
              { name: 'avl_tree_complete.java', size: '28 KB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'dsa-mod-2',
        title: 'Module 2: Graph Theory, Shortest Paths & MSTs',
        duration: '4 hours 45 mins',
        lessons: [
          {
            id: 'dsa-les-2-1',
            title: '2.1 Graph Representations: Adjacency List vs Matrix',
            duration: '35 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            content: 'Space complexity trade-offs, directed vs undirected graphs, and edge weights storage.',
            completed: false,
            resources: [
              { name: 'graph_starter_kit.py', size: '20 KB', url: '#' }
            ]
          },
          {
            id: 'dsa-les-2-2',
            title: '2.2 Dijkstra & Bellman-Ford Shortest Path Algorithms',
            duration: '52 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            content: 'Priority queue relaxation step, negative cycle detection, and complexity analysis O((V + E) log V).',
            completed: false,
            resources: [
              { name: 'dijkstra_visualizer.ipynb', size: '540 KB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-spring-react',
    title: 'Enterprise Java Spring Boot & React Microservices',
    subtitle: 'Production-ready architecture with Spring Security, JWT, JPA, and React 19.',
    description: 'Build robust enterprise cloud backends in Java 21, configure Spring Security filter chains, OAuth2 authorization servers, and high-performance React frontends.',
    category: 'Software Engineering',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch S3',
    rating: 4.92,
    reviewCount: 220,
    enrolledStudents: 195,
    syllabusCompletion: 55,
    price: 189,
    originalPrice: 349,
    duration: '16 Weeks',
    totalLessons: 48,
    published: true,
    status: 'PUBLISHED',
    featured: false,
    certificateEligible: true,
    requirements: ['Core Java OOP concepts', 'Basic HTML/CSS/JavaScript'],
    learningOutcomes: [
      'Design RESTful microservices with Spring Boot and Spring Data JPA',
      'Implement JWT stateless authentication with role-based access control',
      'Build reactive, accessible frontends using React 19 and Tailwind CSS'
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-10-15',
    modules: [
      {
        id: 'spring-mod-1',
        title: 'Module 1: Architecture & Spring Boot 3 Foundations',
        duration: '3 hours 50 mins',
        lessons: [
          {
            id: 'spring-les-1-1',
            title: '1.1 Spring Framework Dependency Injection & Inversion of Control',
            duration: '32 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            content: 'ApplicationContext lifecycle, @Bean scoping, constructor injection, and component scanning mechanics.',
            completed: false,
            resources: [
              { name: 'spring_ioc_architecture.pdf', size: '3.1 MB', url: '#' }
            ]
          },
          {
            id: 'spring-les-1-2',
            title: '1.2 Building RESTful APIs with Spring MVC & Data Validation',
            duration: '42 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
            content: 'DTO pattern, Jakarta validation annotations, global ExceptionHandler middleware, and response entities.',
            completed: false,
            resources: [
              { name: 'rest_api_starter.zip', size: '1.2 MB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'spring-mod-2',
        title: 'Module 2: Spring Security 6 & React 19 Client Integration',
        duration: '4 hours 30 mins',
        lessons: [
          {
            id: 'spring-les-2-1',
            title: '2.1 Stateless JWT Authentication Filter Chains',
            duration: '50 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            content: 'SecurityFilterChain bean configuration, OncePerRequestFilter JWT interceptor, and BCrypt password encoders.',
            completed: false,
            resources: [
              { name: 'jwt_security_filter.java', size: '22 KB', url: '#' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-distributed-sys',
    title: 'Scalable Distributed Systems & High-Performance AI',
    subtitle: 'Architect high-throughput, fault-tolerant distributed machine learning pipelines.',
    description: 'In this comprehensive course, learners delve into the core mathematical principles, distributed storage architectures (Ceph, Lustre), MPI/NCCL interconnects, and cluster autoscaling that power modern foundation models.',
    category: 'Cloud & DevOps',
    level: 'Advanced',
    language: 'English',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch B3',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    syllabusCompletion: 0,
    price: 179,
    originalPrice: 299,
    duration: '10 Weeks',
    totalLessons: 18,
    published: false,
    status: 'PENDING_APPROVAL',
    submissionDate: '2024-10-24',
    certificateEligible: true,
    targetAudience: ['Cloud Architects', 'Backend Engineers', 'AI Infrastructure Teams'],
    skills: ['Distributed Systems', 'NCCL', 'MPI', 'Kubernetes', 'Storage Fabrics'],
    requirements: [
      'Solid grasp of linear algebra, matrix rank, and eigenvalues',
      'Comfortable with high-level Python and basic C++ systems programming'
    ],
    learningOutcomes: [
      'Design and deploy multi-node distributed training pipelines',
      'Benchmark network bandwidth bottlenecks using NCCL tests',
      'Implement asynchronous parameter synchronization algorithms'
    ],
    createdAt: '2024-10-22',
    updatedAt: '2024-10-24',
    modules: [
      {
        id: 'dist-mod-1',
        title: 'Module 1: Foundations of Distributed Data Parallelism',
        description: 'Synchronous vs asynchronous gradient aggregation and ring-AllReduce topology.',
        duration: '2h 15m',
        lessons: [
          {
            id: 'dist-les-1-1',
            title: '1.1 Gradient Aggregation & Mathematical Consistency',
            duration: '35 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'Thorough mathematical breakdown of parameter updates across distributed nodes.',
            completed: false,
            resources: [{ name: 'gradient_derivation.pdf', size: '2.4 MB', url: '#' }]
          },
          {
            id: 'dist-les-1-2',
            title: '1.2 Ring-AllReduce vs Tree-AllReduce Benchmarks',
            duration: '40 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'Network bandwidth modeling and latency saturation.',
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: 'course-cyber-sec-draft',
    title: 'Advanced Applied Cryptography & Zero-Knowledge Proofs',
    subtitle: 'Elliptic curve pairings, SNARKs/STARKs, and cryptographic protocols.',
    description: 'A deep exploration of algebraic group theory, elliptic curves over finite fields, homomorphic encryption, and zero-knowledge cryptographic primitives.',
    category: 'Cybersecurity & Networks',
    level: 'Advanced',
    language: 'English',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    instructorId: 'user-instructor-1',
    instructorName: 'Dr. Aris',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuKqbaKs9X-HtOW2HGJ0LUGhRlYm63E8rQ5TUnnUA-0dJQr3vxuWN3lm-rSkBJSaymQcUgS9Qp5MJPNEyMf1IR4p-BsnXk4tp_xn1lntLl9CG4VeULtYf_LNPJPbdBpOubBiFJXbRUhFpxK6SR_AR1_0F5xGR01eMaoevcqZTMmkSZL6r5QQ8tWbHwLymjk0UtaRSeLn0dRic-IU7h_Szx7ul7kiXdm6J1meipGjm1fYzMJ5GUb2qbew',
    instructorTitle: 'Senior Mentor',
    batch: 'Batch Z1',
    rating: 0,
    reviewCount: 0,
    enrolledStudents: 0,
    syllabusCompletion: 0,
    price: 199,
    duration: '8 Weeks',
    totalLessons: 12,
    published: false,
    status: 'DRAFT',
    certificateEligible: true,
    requirements: ['Abstract Algebra & Modular Arithmetic', 'C/Rust basics'],
    learningOutcomes: [
      'Construct Pedersen commitments and Schnorr identification schemes',
      'Formulate R1CS arithmetic circuits for zk-SNARK verifiers'
    ],
    createdAt: '2024-10-25',
    updatedAt: '2024-10-25',
    modules: [
      {
        id: 'zk-mod-1',
        title: 'Module 1: Finite Fields & Elliptic Curves',
        duration: '2 hours',
        lessons: [
          {
            id: 'zk-les-1-1',
            title: '1.1 Group Axioms and Weierstrass Normal Form',
            duration: '40 mins',
            type: 'video',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
            content: 'Algebraic equations and point doubling formulas.',
            completed: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_DOUBTS: Doubt[] = [
  {
    id: 'doubt-1',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    studentId: 'user-student-2',
    studentName: 'Mike T.',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Matrix Multiplication associativity proof under non-square matrices',
    description: 'When multiplying three non-square matrices $A_{m \\times k}$, $B_{k \\times p}$, $C_{p \\times n}$, does the associative law $(AB)C = A(BC)$ hold strictly without edge cases when dimensions are compatible?',
    codeSnippet: '# Dimension check verification:\nA = np.random.randn(3, 4)\nB = np.random.randn(4, 2)\nC = np.random.randn(2, 5)\nassert np.allclose((A @ B) @ C, A @ (B @ C))',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '1 hour ago'
  },
  {
    id: 'doubt-2',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science & ML',
    batch: 'Batch B2',
    studentId: 'user-student-1',
    studentName: 'Sarah J.',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Learning rate divergence in Batch Gradient Descent with unscaled inputs',
    description: 'My loss function explodes to NaN within 5 iterations unless I normalize the features using StandardScaler. Is feature scaling mandatory for all linear regression optimization models?',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '2 hours ago'
  },
  {
    id: 'doubt-3',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science & ML',
    batch: 'Batch B2',
    studentId: 'user-student-3',
    studentName: 'Alex Rivera',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Stratified K-Fold vs Standard K-Fold on Imbalanced Datasets',
    description: 'When target classes are 95% negative and 5% positive, why does standard K-Fold produce high variance in fold precision?',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '3 hours ago'
  },
  {
    id: 'doubt-4',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    studentId: 'user-student-4',
    studentName: 'Emma Watson',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    title: 'Lagrange Multipliers with multiple inequality constraints',
    description: 'How to properly set up the slack variables for Karush-Kuhn-Tucker (KKT) complementary slackness conditions?',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '5 hours ago'
  },
  {
    id: 'doubt-5',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science & ML',
    batch: 'Batch B2',
    studentId: 'user-student-5',
    studentName: 'Rahul Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Vectorization speed difference between C-order and Fortran-order arrays',
    description: 'Why is slicing along columns slower than slicing along rows in standard NumPy arrays?',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: '6 hours ago'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #3: Gradient Descent Optimization Implementation',
    studentId: 'user-student-1',
    studentName: 'Sarah J.',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    submittedAt: '10 mins ago',
    fileUrl: 'sarah_jenkins_gradient_descent_lab3.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-2',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #3: Gradient Descent Optimization Implementation',
    studentId: 'user-student-2',
    studentName: 'Mike T.',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    submittedAt: '45 mins ago',
    fileUrl: 'mike_t_optimization_code.zip',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-3',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #3: Gradient Descent Optimization Implementation',
    studentId: 'user-student-3',
    studentName: 'Alex Rivera',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    submittedAt: '1 hour ago',
    fileUrl: 'alex_r_lab3_submission.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-4',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    title: 'Problem Set 4: Orthogonal Decompositions & Gram-Schmidt',
    studentId: 'user-student-4',
    studentName: 'Emma Watson',
    studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    submittedAt: '2 hours ago',
    fileUrl: 'emma_w_gram_schmidt_proofs.pdf',
    status: 'PENDING',
    maxScore: 50
  },
  {
    id: 'assign-5',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    title: 'Problem Set 4: Orthogonal Decompositions & Gram-Schmidt',
    studentId: 'user-student-5',
    studentName: 'Rahul Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    submittedAt: '3 hours ago',
    fileUrl: 'rahul_sharma_ps4.pdf',
    status: 'PENDING',
    maxScore: 50
  },
  {
    id: 'assign-6',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #2: Pandas Data Cleaning on 1M Rows',
    studentId: 'user-student-6',
    studentName: 'Priya Nair',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    submittedAt: '4 hours ago',
    fileUrl: 'priya_nair_pandas_lab.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-7',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #2: Pandas Data Cleaning on 1M Rows',
    studentId: 'user-student-7',
    studentName: 'David Chen',
    studentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    submittedAt: '5 hours ago',
    fileUrl: 'david_chen_pandas.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-8',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    title: 'Problem Set 3: Eigenvalues & Characteristic Polynomials',
    studentId: 'user-student-8',
    studentName: 'Sophia Taylor',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    submittedAt: '6 hours ago',
    fileUrl: 'sophia_eigenvalues_proofs.pdf',
    status: 'PENDING',
    maxScore: 50
  },
  {
    id: 'assign-9',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #3: Gradient Descent Optimization Implementation',
    studentId: 'user-student-9',
    studentName: 'Lucas Silva',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    submittedAt: '7 hours ago',
    fileUrl: 'lucas_silva_lab3.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-10',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    title: 'Problem Set 4: Orthogonal Decompositions & Gram-Schmidt',
    studentId: 'user-student-10',
    studentName: 'Maya Patel',
    studentAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    submittedAt: '8 hours ago',
    fileUrl: 'maya_patel_orthogonal.pdf',
    status: 'PENDING',
    maxScore: 50
  },
  {
    id: 'assign-11',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    batch: 'Batch B2',
    title: 'Assignment #3: Gradient Descent Optimization Implementation',
    studentId: 'user-student-11',
    studentName: 'Ethan Wright',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    submittedAt: '9 hours ago',
    fileUrl: 'ethan_w_gd.ipynb',
    status: 'PENDING',
    maxScore: 100
  },
  {
    id: 'assign-12',
    courseId: 'course-calc-201',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    batch: 'Batch A1',
    title: 'Problem Set 3: Eigenvalues & Characteristic Polynomials',
    studentId: 'user-student-12',
    studentName: 'Olivia Martinez',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    submittedAt: '10 hours ago',
    fileUrl: 'olivia_martinez_ps3.pdf',
    status: 'PENDING',
    maxScore: 50
  }
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live-1',
    courseId: 'course-dsa-301',
    courseTitle: 'Data Structures 101',
    topic: 'Intro to Binary Trees & Node Representation',
    batch: 'Batch B2',
    instructorName: 'Dr. Aris',
    startTime: '10:00 AM',
    duration: 'In 15 mins (60 mins session)',
    expectedStudents: 45,
    status: 'LIVE',
    meetingLink: 'https://meet.studyecart.com/ds101-batch-b2'
  },
  {
    id: 'live-2',
    courseId: 'course-calc-201',
    courseTitle: 'Vector Spaces & Linear Algebra',
    topic: 'Linear Algebra Module: Orthogonal Subspaces',
    batch: 'Batch A1',
    instructorName: 'Dr. Aris',
    startTime: '02:30 PM',
    duration: '4 hrs away (90 mins session)',
    expectedStudents: 38,
    status: 'UPCOMING',
    meetingLink: 'https://meet.studyecart.com/calc201-batch-a1'
  },
  {
    id: 'live-3',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science',
    topic: 'Stochastic Gradient Descent Live Code Review',
    batch: 'Batch B2',
    instructorName: 'Dr. Aris',
    startTime: 'Tomorrow, 11:00 AM',
    duration: '75 mins session',
    expectedStudents: 60,
    status: 'UPCOMING',
    meetingLink: 'https://meet.studyecart.com/ds101-code-review'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'ASSIGNMENT',
    actor: 'Sarah J.',
    action: 'submitted Assignment #3 in',
    target: 'Python for Data Science.',
    timestamp: '10 mins ago',
    statusColor: 'emerald'
  },
  {
    id: 'act-2',
    type: 'DOUBT',
    actor: 'Mike T.',
    action: 'raised a new doubt regarding',
    target: 'Matrix Multiplication.',
    timestamp: '1 hour ago',
    statusColor: 'amber'
  },
  {
    id: 'act-3',
    type: 'EVALUATION',
    actor: 'You',
    action: 'completed evaluation for',
    target: 'Batch B2 Mid-terms.',
    timestamp: 'Yesterday, 4:30 PM',
    statusColor: 'gray'
  },
  {
    id: 'act-4',
    type: 'SYSTEM',
    actor: 'System',
    action: 'generated weekly attendance report for',
    target: 'Batch A1 & B2.',
    timestamp: 'Yesterday, 10:00 AM',
    statusColor: 'gray'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-ds-1',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science & Machine Learning',
    title: 'Mid-Term Assessment: Feature Engineering & Gradient Descent',
    description: 'Test your understanding of matrix broadcasting, cost function formulation, and learning rate tuning.',
    timeLimitMinutes: 20,
    passingScore: 70,
    totalQuestions: 5,
    status: 'PUBLISHED',
    questions: [
      {
        id: 'q1',
        question: 'Which NumPy operation performs element-wise addition between a (3, 1) matrix and a (1, 4) vector without creating explicit copies?',
        options: [
          'Array Concatenation',
          'Broadcasting',
          'Matrix Transposition',
          'Explicit Tiling'
        ],
        correctAnswerIndex: 1,
        explanation: 'NumPy broadcasting stretches dimensions of size 1 across compatible axis boundaries with zero memory reallocation.',
        points: 20
      },
      {
        id: 'q2',
        question: 'In Ridge Regression (L2 regularization), how does the penalty parameter λ affect model weights as λ → ∞?',
        options: [
          'Weights blow up exponentially',
          'Weights shrink towards zero but rarely reach exact zero',
          'Weights are set to exactly zero like Lasso (L1)',
          'Weights remain unchanged'
        ],
        correctAnswerIndex: 1,
        explanation: 'L2 regularization adds a quadratic penalty ||w||^2, which continuously shrinks weights towards zero without forcing sparsity like L1.',
        points: 20
      },
      {
        id: 'q3',
        question: 'What is the primary indicator that a model is suffering from high variance (overfitting)?',
        options: [
          'High training error and high validation error',
          'Low training error and high validation error',
          'High training error and low validation error',
          'Low training error and low validation error'
        ],
        correctAnswerIndex: 1,
        explanation: 'A large generalization gap (low training error with significantly worse validation error) is the hallmark of overfitting/high variance.',
        points: 20
      },
      {
        id: 'q4',
        question: 'Which optimizer adaptively computes individual learning rates for different parameters using estimates of first and second moments of the gradients?',
        options: [
          'Vanilla Stochastic Gradient Descent (SGD)',
          'Adam (Adaptive Moment Estimation)',
          'Nesterov Accelerated Gradient',
          'Simulated Annealing'
        ],
        correctAnswerIndex: 1,
        explanation: 'Adam keeps exponentially decaying averages of past gradients (momentum) and past squared gradients (RMSProp).',
        points: 20
      },
      {
        id: 'q5',
        question: 'Why should feature scaling (e.g. StandardScaler) be fit ONLY on the training split and then transformed on the test split?',
        options: [
          'To prevent data leakage from test distribution into model training',
          'Because test sets cannot contain negative numbers',
          'To speed up CPU clock cycles',
          'It is an optional aesthetic convention'
        ],
        correctAnswerIndex: 0,
        explanation: 'Fitting scalers on the entire dataset leaks information about the mean and variance of unseen test samples, invalidating unbiased validation.',
        points: 20
      }
    ]
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    courseId: 'course-dsa-301',
    courseTitle: 'Data Structures 101: Master Algorithmic Thinking',
    studentId: 'user-student-1',
    studentName: 'Sarah Jenkins',
    instructorName: 'Dr. Aris',
    issueDate: 'October 15, 2024',
    certificateNumber: 'SEC-2024-DSA-88291',
    grade: 'A+ (Distinction)',
    downloadUrl: '#'
  },
  {
    id: 'cert-2',
    courseId: 'course-ds-101',
    courseTitle: 'Python for Data Science & Machine Learning',
    studentId: 'user-student-1',
    studentName: 'Sarah Jenkins',
    instructorName: 'Dr. Aris',
    issueDate: 'September 28, 2024',
    certificateNumber: 'SEC-2024-PYDS-44120',
    grade: 'A (Honors)',
    downloadUrl: '#'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Live Class Starting Soon',
    message: 'Data Structures 101 (Batch B2) starts in 15 minutes. Click to join the studio.',
    type: 'ALERT',
    read: false,
    timestamp: '5 mins ago',
    link: '/instructor/live'
  },
  {
    id: 'notif-2',
    title: 'New Student Submission',
    message: 'Sarah Jenkins submitted Assignment #3 for Python for Data Science.',
    type: 'INFO',
    read: false,
    timestamp: '10 mins ago',
    link: '/instructor/assignments'
  },
  {
    id: 'notif-3',
    title: 'Urgent Question in Queue',
    message: 'Mike Turner posted a high priority doubt in Linear Algebra.',
    type: 'WARNING',
    read: false,
    timestamp: '1 hour ago',
    link: '/instructor/doubts'
  },
  {
    id: 'notif-4',
    title: 'Weekly Attendance Synchronized',
    message: 'Batch A1 attendance report has been compiled and archived.',
    type: 'SUCCESS',
    read: true,
    timestamp: '1 day ago'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mid-term Assessment Schedule & Instructions',
    content: 'All students enrolled in Batch B2 must complete their online timed assessment by Friday 11:59 PM. Please review Module 2 notes and ensure stable connectivity.',
    targetBatch: 'Batch B2',
    courseTitle: 'Python for Data Science & Machine Learning',
    authorName: 'Dr. Aris',
    createdAt: 'Oct 23, 2024',
    priority: 'HIGH'
  },
  {
    id: 'ann-2',
    title: 'Extra Office Hours for Linear Algebra Decompositions',
    content: 'Special Q&A session will be held this Thursday at 4:00 PM for students working on the Singular Value Decomposition (SVD) proofs.',
    targetBatch: 'Batch A1',
    courseTitle: 'Advanced Calculus & Linear Algebra',
    authorName: 'Dr. Aris',
    createdAt: 'Oct 21, 2024',
    priority: 'NORMAL'
  }
];

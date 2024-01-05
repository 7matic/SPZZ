import requests

API_URL = "http://127.0.0.1:5000"

def test_job_match_1():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Python developer with experience in web frameworks such as Django or Flask.",
        "user_data": "I am a Python developer with 3 years of experience primarily in data analysis with Pandas and NumPy."
    }
    
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 1")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")
    
def test_job_match_2():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a skilled front-end developer proficient in React, HTML, and CSS.",
        "user_data": "I'm a front-end developer with a deep understanding of Angular and Vue, but I'm currently learning React."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 2")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_3():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Frontend Developer with extensive experience in modern JavaScript frameworks. The ideal candidate should have in-depth knowledge of React, Vue.js, and Angular, along with proficiency in state management libraries like Redux or Vuex. Experience with responsive design, accessibility standards, and optimizing frontend performance is also critical. Familiarity with CSS preprocessors, build tools, and modern development workflows is expected.",
        "user_data": "I'm a passionate frontend developer with 5 years of experience. I excel in React and have built multiple projects using Redux for state management. My portfolio includes responsive designs implemented with a deep understanding of CSS and Sass, ensuring accessibility and performance. I am also comfortable with Vue.js and have a basic understanding of Angular."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 3")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_4():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We are looking for a Backend Developer capable of handling complex systems. The candidate should have extensive experience with backend programming languages such as Python, Java, or Node.js. Deep understanding of database management, RESTful API development, and microservices architecture is required. Experience with Docker, Kubernetes, and cloud services (AWS, Azure, or GCP) is highly valued. The candidate should demonstrate a track record of optimizing server-side performance and ensuring system scalability and security.",
        "user_data": "As a seasoned backend developer, I have spent over 6 years developing robust backend systems using Python and Node.js. I have a solid grasp of RESTful API design and have implemented scalable microservices architectures. My experience with AWS and Docker has enabled me to deploy and manage containerized applications efficiently. While I have a foundational understanding of Kubernetes, I am keen on expanding my expertise in this area."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 4")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")
    
def test_job_match_5():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "In search of a Full-Stack Developer with a versatile skill set to build end-to-end solutions. The ideal candidate should be proficient in both frontend technologies (React, Angular, or Vue.js) and backend technologies (Node.js, Django, or Ruby on Rails). Strong database skills with both SQL and NoSQL databases are required. The candidate should also be familiar with version control systems, CI/CD pipelines, and unit/integration testing. An understanding of cloud services and DevOps practices would be a significant advantage.",
        "user_data": "I am an adaptable full-stack developer with 4 years of experience building comprehensive web applications. My frontend development is centered around React and Vue.js, creating dynamic and responsive user interfaces. On the backend, I am skilled in Node.js and have worked with MongoDB and PostgreSQL databases. I practice thorough testing, version control with Git, and have begun incorporating CI/CD into my workflow. I'm currently enhancing my cloud and DevOps skills, particularly with AWS and Docker."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 5")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_6():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Data Scientist with expertise in machine learning and statistical analysis. The ideal candidate should have experience with Python, R, and data visualization libraries such as Matplotlib and Seaborn. Strong knowledge of data preprocessing, feature engineering, and model evaluation is required. Familiarity with deep learning frameworks like TensorFlow or PyTorch is a plus.",
        "user_data": "I am a data scientist with a background in statistics and machine learning. I have extensive experience using Python and R for data analysis and modeling. I am proficient in data visualization using Matplotlib and Seaborn. Additionally, I have worked with TensorFlow for deep learning projects."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 6")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_7():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for an experienced DevOps Engineer familiar with automation tools, cloud infrastructure, and continuous integration and delivery. The ideal candidate should have a deep understanding of scripting languages, deployment automation, and network protocols. Experience with container orchestration, monitoring systems, and infrastructure as code is highly valuable.",
        "user_data": "I am a DevOps engineer with extensive experience in automation using tools like Ansible and Jenkins. I'm proficient in AWS and have practical knowledge of container orchestration with Kubernetes. I'm constantly exploring new technologies to improve deployment workflows and system reliability."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 7")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_8():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Machine Learning Engineer with extensive experience in building and deploying machine learning models. The ideal candidate should be proficient in Python, R, and TensorFlow or PyTorch. Experience with big data technologies and knowledge of various machine learning algorithms is expected.",
        "user_data": "I am a machine learning engineer with a strong foundation in Python and R. I have hands-on experience with TensorFlow and have worked on several projects involving deep learning and natural language processing. I'm continually seeking to implement the latest algorithms and techniques in my work."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 8")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_9():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We need a creative Frontend Developer experienced in building interactive and user-friendly web applications. The ideal candidate should be proficient in JavaScript, HTML, and CSS with a strong understanding of UX/UI principles. Experience with animation libraries and creating responsive designs is a must.",
        "user_data": "I'm a frontend developer with a flair for creating engaging user experiences. I have solid experience with JavaScript, HTML, and CSS, and have worked extensively with animation libraries to bring designs to life. I am also skilled in crafting responsive layouts and have a keen eye for detail in UX/UI design."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 9")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_10():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Full-Stack Developer to build and maintain enterprise solutions. The candidate should have experience with both frontend (React or Angular) and backend (Java, Spring Boot) technologies. Knowledge of DevOps tools, cloud services, and database management is also required.",
        "user_data": "As a full-stack developer, I've developed and maintained various enterprise solutions. I am proficient in React and Angular on the frontend and have extensive experience with Java and Spring Boot on the backend. I'm also skilled in using DevOps tools and cloud services to optimize deployment and scalability."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 10")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_11():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "In need of a Software Engineer with a strong focus on system integration and API development. Experience with various programming languages (Python, Java, C#), integration patterns, and working with third-party APIs is essential. The candidate should also understand secure coding practices.",
        "user_data": "I'm a software engineer specializing in system integration and API development. I have experience working with a range of programming languages and have integrated various third-party services. My development practices always consider security, and I'm committed to writing clean, efficient code."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 11")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_12():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for an AI Developer with expertise in Natural Language Processing. The candidate should have experience with Python, TensorFlow or PyTorch, and a strong understanding of NLP techniques and algorithms. Experience with machine learning model deployment and scaling is a plus.",
        "user_data": "I am an AI developer with a focus on natural language processing. I have hands-on experience with TensorFlow and PyTorch and have implemented various NLP techniques in my projects. I'm also knowledgeable about deploying and scaling machine learning models efficiently."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 12")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_13():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking an experienced Software Engineer with a focus on cloud infrastructure and services. The ideal candidate should have experience with AWS, Azure, or GCP, and a solid understanding of cloud architecture, security, and deployment strategies. Knowledge of containerization and orchestration tools like Docker and Kubernetes is highly desirable.",
        "user_data": "I am a software engineer specializing in cloud infrastructure. I have extensive experience with AWS and have worked with various services and deployment models. My skills also include containerization with Docker and basic orchestration with Kubernetes. I am deeply committed to building secure and scalable cloud solutions."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 13: Software Engineer (Cloud Infrastructure)")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_14():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Software Engineer with expertise in embedded systems and firmware development. The candidate should be proficient in C/C++, understand microcontroller architectures, and have experience with real-time operating systems. Knowledge of hardware interfaces and protocol development is essential.",
        "user_data": "As a software engineer, I have specialized in embedded systems and firmware development. I am proficient in C/C++ and have worked extensively with various microcontrollers and real-time operating systems. I have also developed several hardware interfaces and communication protocols."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 14: Software Engineer (Embedded Systems)")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_15():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Software Engineer with significant experience in mobile application development. The candidate should be proficient in either Android (Java/Kotlin) or iOS (Swift) development. Experience with cross-platform frameworks like Flutter or React Native is a plus. A strong understanding of mobile UI/UX principles is essential.",
        "user_data": "I am a software engineer with a strong background in mobile application development. I am proficient in both Android (Kotlin) and iOS (Swift) and have some experience with cross-platform development using Flutter. I prioritize creating intuitive and user-friendly mobile experiences."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 15")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_16():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a talented Software Engineer with a focus on game development. The ideal candidate should have experience with game engines like Unity or Unreal Engine, a strong understanding of game physics and AI, and proficiency in C# or C++. Experience with 3D modeling and animation would be an advantage.",
        "user_data": "I am a software engineer specializing in game development. I have extensive experience with both Unity and Unreal Engine, and I'm proficient in C# and C++. I've worked on multiple projects involving complex game physics and AI. I also have some experience with 3D modeling and animation."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 16")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_17():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Frontend Engineer with deep expertise in React. The ideal candidate should have a proven track record of building complex applications with React and Redux. Experience with React Hooks, Context API, and performance optimization is critical. Proficiency in modern JavaScript, HTML, and CSS is expected.",
        "user_data": "I am a Frontend Engineer specializing in React. I've built several large-scale applications using React and Redux. I'm skilled in using Hooks and the Context API for state management and have a strong focus on writing performant, maintainable code. My expertise also includes modern JavaScript, HTML, and CSS."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 17")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_18():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Frontend Engineer with extensive experience in building eCommerce platforms. The candidate should be proficient in JavaScript frameworks like Angular or Vue.js, and have experience with responsive design, payment gateway integration, and SEO principles. Knowledge of headless CMS and eCommerce APIs is highly desirable.",
        "user_data": "As a Frontend Engineer, I have considerable experience in creating robust eCommerce platforms using Angular. I've worked on payment integrations, responsive designs, and have a good understanding of SEO. I'm also familiar with using headless CMS and various eCommerce APIs to create seamless user experiences."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 18")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_19():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Frontend Engineer with a passion for UX/UI design. The ideal candidate should have a portfolio showcasing their ability to create intuitive and visually appealing user interfaces. Proficiency in HTML, CSS, and JavaScript is required. Experience with design tools like Sketch or Adobe XD is a plus.",
        "user_data": "I am a Frontend Engineer with a strong passion for UX/UI design. My portfolio includes various projects where I've created intuitive and visually appealing interfaces. I'm proficient in HTML, CSS, and JavaScript, and have experience using Sketch and Adobe XD for designing prototypes."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 19")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_20():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Frontend Engineer with experience in building Progressive Web Apps (PWA). The candidate should have a strong understanding of service workers, web manifest, and creating app-like experiences on the web. Proficiency in React or Angular, along with performance optimization techniques, is required.",
        "user_data": "As a Frontend Engineer, I've specialized in building Progressive Web Apps using React. I have a thorough understanding of service workers, web manifest, and have created several app-like experiences. I'm also focused on performance optimization to ensure the best user experience."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 20")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_21():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a creative Frontend Engineer with a focus on animation and interactivity. The candidate should be proficient in JavaScript and have experience with libraries like GSAP, Three.js, or anime.js. A strong understanding of the principles of animation and creating engaging user interactions is essential.",
        "user_data": "I am a Frontend Engineer with a passion for animation and creating interactive experiences. I've worked extensively with GSAP and Three.js to bring websites to life with captivating animations and interactive elements. My approach is always user-centric, ensuring that interactions are engaging and intuitive."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 21")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")
    
def test_job_match_22():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We are seeking a visionary AI Specialist to lead our team in developing cutting-edge machine learning models. The ideal candidate will have extensive experience with deep learning, computer vision, and natural language processing. Proficiency in Python, TensorFlow, and Keras is a must. Experience in deploying models to production and knowledge of MLOps practices will be highly valued.",
        "user_data": "I am an AI Specialist with a deep understanding of deep learning and its applications in computer vision and NLP. I've developed several complex models using TensorFlow and Keras and am experienced in deploying these models into production environments. I am continuously exploring MLOps practices to enhance model deployment and monitoring."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 22")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_23():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We're looking for an AI Research Scientist to push the boundaries of artificial intelligence. The candidate should have a Ph.D. in Computer Science or related field and a strong publication record in top-tier conferences. Expertise in reinforcement learning, unsupervised learning, or similar areas is required. Strong programming skills and experience with PyTorch or similar frameworks are essential.",
        "user_data": "As an AI Research Scientist, I have a Ph.D. in Computer Science and have published extensively in areas like reinforcement learning and unsupervised learning. I have a strong grasp of various AI methodologies and am proficient in PyTorch. I'm passionate about developing innovative solutions that advance the field of AI."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 23")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_24():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We are looking for an AI Engineer to develop and maintain our AI-powered products. The ideal candidate should have experience with machine learning, deep learning, and natural language processing. Proficiency in Python, experience with cloud platforms, and understanding of data pipelines are essential. The candidate should also demonstrate the ability to work collaboratively in a fast-paced environment.",
        "user_data": "I am an AI Engineer with hands-on experience in machine learning and deep learning. I have worked on several NLP projects and am skilled in Python and cloud platforms. I understand the intricacies of data pipelines and excel in fast-paced, collaborative environments. My focus is always on developing scalable and efficient AI-powered solutions."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 24")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_25():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Data Scientist with a strong focus on AI and machine learning to join our team. The ideal candidate will have experience in predictive modeling, statistical analysis, and data visualization. Proficiency in Python, R, SQL, and machine learning libraries is required. Experience with big data technologies and cloud platforms will be a significant advantage.",
        "user_data": "I'm a Data Scientist with a focus on AI and machine learning. I have extensive experience in predictive modeling and statistical analysis. I'm proficient in Python, R, and SQL, and have worked with various machine learning libraries. I'm also familiar with big data technologies and cloud platforms, which allows me to handle large datasets effectively."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 25")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_26():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Backend Engineer with strong experience in microservices architecture and cloud-native technologies. The ideal candidate should be proficient in Go or Node.js and have hands-on experience with Docker, Kubernetes, and cloud platforms like AWS or GCP. A solid understanding of RESTful API design and database optimization is required.",
        "user_data": "As a Backend Engineer, I've developed scalable microservices using Go and Node.js. I'm experienced in containerization with Docker and orchestration with Kubernetes, primarily on AWS. I'm dedicated to crafting efficient RESTful APIs and optimizing database interactions for performance and scalability."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 26")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_27():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for a Backend Engineer with expertise in building scalable APIs and handling large volumes of data. The candidate should have strong experience with Python or Java and be familiar with frameworks like Django or Spring. Experience with NoSQL databases and message brokers like Kafka or RabbitMQ is highly desirable.",
        "user_data": "I'm a Backend Engineer specializing in Python and Java. I've built scalable APIs using Django and Spring and have experience managing large datasets with NoSQL databases. I've also worked with Kafka for message processing and am adept at integrating various data services to create robust backend systems."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 27")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_28():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "We need a Backend Engineer to focus on security and authentication. The ideal candidate should have experience with OAuth, JWT, and other authentication mechanisms. Proficiency in Node.js or Ruby and a strong understanding of cybersecurity best practices is required. Experience with IAM services on cloud platforms is a plus.",
        "user_data": "As a Backend Engineer, I have a keen focus on security and authentication. I've implemented OAuth and JWT in various applications using Node.js and Ruby. I stay updated on cybersecurity trends and am familiar with IAM services on cloud platforms, ensuring secure and robust backend solutions."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 28")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_29():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Seeking a Backend Engineer with a strong background in data engineering. The candidate should be proficient in ETL processes, data warehousing, and working with big data tools like Hadoop or Spark. Experience with Python, Scala, or Java is essential. Knowledge of data streaming and real-time analytics is highly valued.",
        "user_data": "I am a Backend Engineer with extensive data engineering experience. I've designed and maintained ETL processes and data warehouses, and have worked with Hadoop and Spark for big data processing. My programming skills include Python, Scala, and Java. I'm also familiar with data streaming and real-time analytics technologies."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 29")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

def test_job_match_30():
    endpoint = f"{API_URL}/job_match"
    request_body = {
        "job_description": "Looking for an experienced Backend Engineer to lead our API development. The candidate should have a deep understanding of API lifecycle management, versioning, and documentation. Proficiency in PHP, Python, or Ruby and experience with API gateways are required. Familiarity with serverless architectures and GraphQL is a plus.",
        "user_data": "As a seasoned Backend Engineer, I've led API development projects, ensuring robust and scalable solutions. I'm proficient in PHP, Python, and Ruby and have extensive experience with API gateways. I'm also familiar with serverless architectures and have begun exploring GraphQL for more efficient data retrieval."
    }
    response = requests.post(endpoint, json=request_body)
    assert response.status_code == 200
    response_data = response.json()
    assert 'match_percentage' in response_data
    print("\nTest 30")
    print(f"Job Description: {request_body['job_description']}")
    print(f"User Data: {request_body['user_data']}")
    print(f"Match Percentage: {response_data['match_percentage']}")

// Data service for accessing and manipulating application data
import courseData from '../data/courseData.json';

// Types
export interface Course {
  id: number;
  title: string;
  slug: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  discount: number | null;
  rating: number;
  reviews: number;
  image: string;
  featured: boolean;
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
  };
  description: string;
  objectives: string[];
  curriculum: {
    day: string;
    topics: string[];
  }[];
  prerequisites: string[];
  upcomingDates: {
    date: string;
    location: string;
    availability: string;
  }[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  workingHours: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[];
}

// Data retrieval functions
export const getAllCourses = (): Course[] => {
  return courseData.courses;
};

export const getCourseById = (id: number): Course | undefined => {
  return courseData.courses.find(course => course.id === id);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courseData.courses.find(course => course.slug === slug);
};

export const getFeaturedCourses = (): Course[] => {
  return courseData.courses.filter(course => course.featured);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courseData.courses.filter(course => course.category === category);
};

export const getAllCategories = (): Category[] => {
  return courseData.categories;
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return courseData.categories.find(category => category.slug === slug);
};

export const getAllTestimonials = (): Testimonial[] => {
  return courseData.testimonials;
};

export const getAllStats = (): Stat[] => {
  return courseData.stats;
};

export const getAllBranches = (): Branch[] => {
  return courseData.branches;
};

export const getBranchById = (id: number): Branch | undefined => {
  return courseData.branches.find(branch => branch.id === id);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return courseData.blogPosts;
};

export const getBlogPostById = (id: number): BlogPost | undefined => {
  return courseData.blogPosts.find(post => post.id === id);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return courseData.blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return courseData.blogPosts.filter(post => post.category === category);
};

// Helper function to simulate an API fetch with a delay
export const fetchWithDelay = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

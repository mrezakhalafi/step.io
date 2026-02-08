'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'Step.io': 'Step.io',
    'Add New Task': 'Add New Task',
    'My settings': 'My settings',
    
    // Sidebar
    'Weekly Pinned': 'Weekly Pinned',
    'View all': 'View all',
    'Add new weekly pin': 'Add new weekly pin',
    'March, 2020': 'February, 2026', // Updated to current month
    
    // Today's Schedule
    'Today\'s schedule': 'Today\'s schedule',
    
    // Music Player
    'Music Player Settings': 'Music Player Settings',
    'Now is almost Sunny': 'Now is almost Sunny',
    
    // Modals
    'Task Title': 'Task Title',
    'Description': 'Description',
    'Time': 'Time',
    'Date': 'Date',
    'Category': 'Category',
    'Cancel': 'Cancel',
    'Add Task': 'Add Task',
    'Edit Task': 'Edit Task',
    'Update Task': 'Update Task',
    'Delete': 'Delete',
    'Settings': 'Settings',
    'Close': 'Close',
    'All Pinned Tasks': 'All Pinned Tasks',
    'Account Settings': 'Account Settings',
    'Notifications': 'Notifications',
    'Privacy': 'Privacy',
    'Help & Support': 'Help & Support',
    'Logout': 'Logout',
    'Upgrade to Premium': 'Upgrade to Premium',
    
    // Categories
    'Categories': 'Categories',
    'Add New Category': 'Add New Category',
    'Category Name': 'Category Name',
    'Color': 'Color',
    'Add Category': 'Add Category',
    'Edit Category': 'Edit Category',
    'Update Category': 'Update Category',
    'No categories yet': 'No categories yet',
    'active categories': 'active categories',
    
    // Music
    'Change Music': 'Change Music',
    'Change Music Modal Title': 'Change Music',
    'Search music...': 'Search music...',
    
    // Other
    'No tasks scheduled for today': 'No tasks scheduled for today',
    'Personal': 'Personal',
    'Work': 'Work',
    'Health': 'Health',
    'Other': 'Other',
    'Completed': 'Completed',
    'Settings content goes here': 'Settings content goes here',
    'Add': 'Add',
    'Edit': 'Edit',
    'Save': 'Save',
    'Yes': 'Yes',
    'No': 'No',
    'Confirm': 'Confirm',
    'Are you sure?': 'Are you sure?',
    'Language': 'Language',
    'English': 'English',
    'Indonesian': 'Indonesian',
  },
  id: {
    // Header
    'Step.io': 'Step.io',
    'Add New Task': 'Tambah Tugas Baru',
    'My settings': 'Pengaturan saya',
    
    // Sidebar
    'Weekly Pinned': 'Tugas Tersemat Mingguan',
    'View all': 'Lihat semua',
    'Add new weekly pin': 'Tambahkan tugas mingguan baru',
    'March, 2020': 'Februari, 2026', // Updated to current month
    
    // Today's Schedule
    'Today\'s schedule': 'Jadwal hari ini',
    
    // Music Player
    'Music Player Settings': 'Pengaturan Pemutar Musik',
    'Now is almost Sunny': 'Cuaca hampir cerah',
    
    // Modals
    'Task Title': 'Judul Tugas',
    'Description': 'Deskripsi',
    'Time': 'Waktu',
    'Date': 'Tanggal',
    'Category': 'Kategori',
    'Cancel': 'Batal',
    'Add Task': 'Tambah Tugas',
    'Edit Task': 'Edit Tugas',
    'Update Task': 'Perbarui Tugas',
    'Delete': 'Hapus',
    'Settings': 'Pengaturan',
    'Close': 'Tutup',
    'All Pinned Tasks': 'Semua Tugas Tersemat',
    'Account Settings': 'Pengaturan Akun',
    'Notifications': 'Notifikasi',
    'Privacy': 'Privasi',
    'Help & Support': 'Bantuan & Dukungan',
    'Logout': 'Keluar',
    'Upgrade to Premium': 'Tingkatkan ke Premium',
    
    // Categories
    'Categories': 'Kategori',
    'Add New Category': 'Tambah Kategori Baru',
    'Category Name': 'Nama Kategori',
    'Color': 'Warna',
    'Add Category': 'Tambah Kategori',
    'Edit Category': 'Edit Kategori',
    'Update Category': 'Perbarui Kategori',
    'No categories yet': 'Belum ada kategori',
    'active categories': 'kategori aktif',
    
    // Music
    'Change Music': 'Ganti Musik',
    'Change Music Modal Title': 'Ganti Musik',
    'Search music...': 'Cari musik...',
    
    // Other
    'No tasks scheduled for today': 'Tidak ada tugas untuk hari ini',
    'Personal': 'Pribadi',
    'Work': 'Pekerjaan',
    'Health': 'Kesehatan',
    'Other': 'Lainnya',
    'Completed': 'Selesai',
    'Settings content goes here': 'Konten pengaturan ada di sini',
    'Add': 'Tambah',
    'Edit': 'Edit',
    'Save': 'Simpan',
    'Yes': 'Ya',
    'No': 'Tidak',
    'Confirm': 'Konfirmasi',
    'Are you sure?': 'Apakah Anda yakin?',
    'Language': 'Bahasa',
    'English': 'Inggris',
    'Indonesian': 'Indonesia',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations?[language][key as any]:key;
    return translation || key; // Return the key itself if no translation is found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
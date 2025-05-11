import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import CourseCard from '../components/CourseCard';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [showCertified, setShowCertified] = useState(false);
  const [showFree, setShowFree] = useState(false);

  const allCourses = [
    // {
    //   id: 1,
    //   title: '"Поколение Python": алгоритмы и структуры данных для начинающих',
    //   author: 'Тимур Гуев, Школа BEEGEEK',
    //   price: 5900,
    //   oldPrice: 6900,
    //   rating: 5,
    //   students: 943,
    //   duration: '62 ч',
    //   image: require('../assets/images/python-course.png'),
    //   hasCertificate: true,
    //   isNew: false,
    //   isTrending: true,
    // },
    // {
    //   id: 2,
    //   title: 'C#: Микросервисы, CQRS, Event Sourcing',
    //   author: 'Сергей Каменецкий',
    //   price: 15000,
    //   rating: 4.8,
    //   students: 15,
    //   duration: '14 ч',
    //   image: require('../assets/images/csharp-course.png'),
    //   hasCertificate: true,
    //   isNew: false,
    //   isTrending: true,
    // },
    // {
    //   id: 3,
    //   title: 'Бизнес аналитик в IT с Нуля до Специалиста',
    //   author: 'Михаил Кулешов',
    //   price: 3790,
    //   rating: 4.8,
    //   students: 2100,
    //   duration: '13 ч',
    //   image: require('../assets/images/business-course.png'),
    //   hasCertificate: true,
    //   isNew: false,
    //   isTrending: true,
    // },
    {
      id: 1,
      title: 'Космос: Безграничная Пустота и Бесконечные Возможности',
      author: 'Космический Центр',
      price: 0,
      rating: 5.0,
      students: 943,
      duration: '18 ч',
      image: require('../assets/images/1lesson.jpg'),
      hasCertificate: false,
      isNew: false,
      isTrending: true,
    },
    {
      id: 2,
      title: 'Астрономия: Наука о Вселенной',
      author: 'Космический Центр',
      price: 0,
      rating: 4.9,
      students: 2100,
      duration: '11 ч',
      image: require('../assets/images/2lesson.jpg'),
      hasCertificate: false,
      isNew: false,
      isTrending: true,
    },
    {
      id: 3,
      title: 'Космонавты: Первопроходцы Космической Эры',
      author: 'Космический Центр',
      price: 0,
      rating: 4.9,
      students: 1782,
      duration: '13 ч',
      image: require('../assets/images/3lesson.jpg'),
      hasCertificate: false,
      isNew: false,
      isTrending: true,
    },
    {
      id: 4,
      title: 'Звезды: Сияющие Гиганты Вселенной',
      author: 'Космический Центр',
      price: 0,
      rating: 5.0,
      students: 156,
      duration: '24 ч',
      image: require('../assets/images/4lesson.jpg'),
      hasCertificate: false,
      isNew: true,
      isTrending: false,
    },
    {
      id: 5,
      title: 'Планеты: Миры на Орбитах Звезд',
      author: 'Космический Центр',
      price: 0,
      rating: 5.0,
      students: 156,
      duration: '24 ч',
      image: require('../assets/images/5lesson.jpg'),
      hasCertificate: false,
      isNew: true,
      isTrending: false,
    },
  ];

  const filteredCourses = allCourses.filter(course => {
    if (showCertified && !course.hasCertificate) return false;
    if (showFree && course.price !== 0) return false;
    
    switch (activeTab) {
      case 'trending':
        return course.isTrending;
      case 'new':
        return course.isNew;
      case 'hits':
        return course.students > 1000;
      default:
        return true;
    }
  });

  const Header = () => (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Название курса, автор или предмет"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Искать</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filtersContent}
      >
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>На любом языке</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterCheckbox, showCertified && styles.activeFilter]}
          onPress={() => setShowCertified(!showCertified)}
        >
          <Text style={[styles.filterText, showCertified && styles.activeFilterText]}>
            С сертификатами
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterCheckbox, showFree && styles.activeFilter]}
          onPress={() => setShowFree(!showFree)}
        >
          <Text style={[styles.filterText, showFree && styles.activeFilterText]}>
            Бесплатные
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
            В тренде
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
            Новые курсы
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'hits' && styles.activeTab]}
          onPress={() => setActiveTab('hits')}
        >
          <Text style={[styles.tabText, activeTab === 'hits' && styles.activeTabText]}>
            Хиты Stepik
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredCourses}
        renderItem={({item}) => <CourseCard {...item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={Header}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#2D6A4F',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 40,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 6,
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  filterButtonText: {
    color: '#333',
    fontSize: 13,
  },
  filterCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  filterText: {
    color: '#666',
    fontSize: 13,
  },
  activeFilter: {
    backgroundColor: '#2D6A4F',
  },
  activeFilterText: {
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 20,
  },
  tab: {
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2D6A4F',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#2D6A4F',
    fontWeight: '600',
  },
}); 
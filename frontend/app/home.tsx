import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import CourseCard from '../components/CourseCard';

export default function HomeScreen() {
  const allCourses = [
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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<typeof allCourses>(allCourses);
  const [activeTab, setActiveTab] = useState('trending');
  const [showCertified, setShowCertified] = useState(false);
  const [showFree, setShowFree] = useState(false);

  useEffect(() => {
    const filtered = allCourses.filter(course => {
      const searchLower = searchQuery.toLowerCase();
      return searchQuery === '' || 
        course.title.toLowerCase().includes(searchLower) ||
        course.author.toLowerCase().includes(searchLower);
    });
    setFilteredResults(filtered);
  }, [searchQuery]);

  const filteredCourses = filteredResults.filter(course => {
    // Фильтрация по сертификатам
    if (showCertified && !course.hasCertificate) return false;
    
    // Фильтрация по бесплатным курсам
    if (showFree && course.price !== 0) return false;
    
    // Фильтрация по вкладкам
    let matchesTab = true;
    switch (activeTab) {
      case 'trending':
        matchesTab = course.isTrending;
        break;
      case 'new':
        matchesTab = course.isNew;
        break;
      case 'hits':
        matchesTab = course.students > 1000;
        break;
    }

    return matchesTab;
  });

  const Header = () => (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Название курса, автор или предмет"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => setSearchQuery('')}
        >
          <Text style={styles.searchButtonText}>
            {searchQuery ? 'Очистить' : 'Искать'}
          </Text>
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
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Курсы не найдены' : 'Нет доступных курсов'}
            </Text>
          </View>
        )}
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
    color: '#333',
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
    fontSize: 14,
    fontWeight: '600',
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
  },
  filterCheckbox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeFilter: {
    backgroundColor: '#2D6A4F',
    borderColor: '#2D6A4F',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2D6A4F',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});
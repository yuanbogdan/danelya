import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // 16px padding on each side

type CourseCardProps = {
  id: number;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  rating: number;
  students: number;
  duration: string;
  image: any;
};

export default function CourseCard({
  id,
  title,
  author,
  price,
  oldPrice,
  rating,
  students,
  duration,
  image,
}: CourseCardProps) {
  const getCourseRoute = () => {
    if (title.includes('Космос: Безграничная Пустота')) {
      return '/course/space-intro';
    } else if (title.includes('Астрономия: Наука о Вселенной')) {
      return '/course/astronomy';
    } else if (title.includes('Космонавты: Первопроходцы')) {
      return '/course/cosmonauts';
    } else if (title.includes('Звезды: Сияющие Гиганты')) {
      return '/course/stars';
    } else if (title.includes('Планеты: Миры на Орбитах')) {
      return '/course/planets';
    }
    return '/course/space';
  };

  const handlePress = () => {
    const route = getCourseRoute();
    router.push(route);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.rating}>★ {rating}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.students}>{students} учеников</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.duration}>{duration}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          {oldPrice && (
            <Text style={styles.oldPrice}>{oldPrice} ₽</Text>
          )}
          <Text style={styles.price}>{price === 0 ? 'Бесплатно' : `${price} ₽`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
    lineHeight: 20,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 10,
    backgroundColor: '#eee',
    marginHorizontal: 6,
  },
  rating: {
    color: '#FFB800',
    fontWeight: '600',
    fontSize: 14,
  },
  students: {
    color: '#666',
    fontSize: 13,
  },
  duration: {
    color: '#666',
    fontSize: 13,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D6A4F',
  },
}); 
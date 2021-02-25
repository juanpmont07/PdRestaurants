import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import RestaurantStack from './RestaurantStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                 <Tab.Screen 
                   name="restaurants"
                   component={RestaurantStack}
                   options = {{title: "Restaurantes"}}
                 />
                 <Tab.Screen 
                   name="favorites"
                   component={FavoritesStack}
                   options = {{title: "Favoritos"}}
                 />
                 <Tab.Screen 
                   name="top-Restaurants"
                   component={TopRestaurantsStack}
                   options = {{title: "Top 5"}}
                 />
                 <Tab.Screen 
                   name="search"
                   component={SearchStack}
                   options = {{title: "Buscar"}}
                 />
                 <Tab.Screen 
                   name="account"
                   component={AccountStack}
                   options = {{title: "Cuenta"}}
                 />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

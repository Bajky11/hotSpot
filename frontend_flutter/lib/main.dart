import 'package:before_leaving/features/list/providers/list_provider.dart';
import 'package:before_leaving/common/providers/screen_controller_provider.dart';
import 'package:before_leaving/screens/detail.dart';
import 'package:before_leaving/screens/home.dart';
import 'package:before_leaving/screens/map.dart';
import 'package:before_leaving/screens/profile.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => ListProvider()),
        ChangeNotifierProvider(create: (context) => ScreenControllerProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.dark()
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const MapScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/detail': (context) => const DetailScreen(),
      },
    );
  }
}

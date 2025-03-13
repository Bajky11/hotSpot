import 'package:before_leaving/screens/detail.dart';
import 'package:before_leaving/screens/home.dart';
import 'package:before_leaving/screens/map.dart';
import 'package:before_leaving/screens/profile.dart';
import 'package:flutter/material.dart';

class ScreenControllerProvider extends ChangeNotifier {
  int navbarScreenIndex = 0;

  void setDetailScreen(dynamic context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const DetailScreen()),
    );
  }

  void setHomeScreen(BuildContext context, int index) {
    navbarScreenIndex = index;
    navigateWithFade(context, const MapScreen());
  }

  void setProfileScreen(BuildContext context, int index) {
    navbarScreenIndex = index;
    navigateWithFade(context, const ProfileScreen());
  }

  void navigateWithFade(BuildContext context, Widget screen) {
    Navigator.pushReplacement(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) => screen,
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
        transitionDuration: const Duration(milliseconds: 300),
      ),
    );
  }
}

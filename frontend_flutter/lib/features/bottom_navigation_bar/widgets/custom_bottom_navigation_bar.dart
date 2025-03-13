import 'package:before_leaving/common/providers/screen_controller_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CustomBottomNaviagtionBar extends StatelessWidget {
  const CustomBottomNaviagtionBar({super.key});

  @override
  Widget build(BuildContext context) {
    final screenProvider = Provider.of<ScreenControllerProvider>(context);

    return BottomNavigationBar(
      currentIndex: screenProvider.navbarScreenIndex,
      onTap: (index) {
        switch (index) {
          case 0:
            return screenProvider.setHomeScreen(context, index);
          case 1:
            return screenProvider.setProfileScreen(context, index);
        }
      },
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: "Domů"),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profil"),
      ],
    );
  }
}

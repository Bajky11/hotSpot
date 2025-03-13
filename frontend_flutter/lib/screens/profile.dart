import 'package:before_leaving/features/app_bar/widgets/custom_app_bar.dart';
import 'package:before_leaving/features/bottom_navigation_bar/widgets/custom_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: [
            FloatingActionButton(
              onPressed: () {
                print("FAB na HomeScreen stisknut!");
              },
              child: const Icon(Icons.add),
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomNaviagtionBar(),
      appBar: CustomAppBar(text: "Profile"),
    );
  }
}

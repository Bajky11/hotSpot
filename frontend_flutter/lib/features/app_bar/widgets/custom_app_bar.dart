import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({super.key, required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    return AppBar(title: Text(text));
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight); // Výška standardního AppBaru
}

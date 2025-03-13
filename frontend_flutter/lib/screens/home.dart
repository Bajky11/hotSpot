import 'package:before_leaving/features/app_bar/widgets/custom_app_bar.dart';
import 'package:before_leaving/features/bottom_navigation_bar/widgets/custom_bottom_navigation_bar.dart';
import 'package:before_leaving/features/list/models/list_item.dart';
import 'package:before_leaving/features/list/providers/list_provider.dart';
import 'package:before_leaving/features/list/widgets/list_item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(
      () => Provider.of<ListProvider>(context, listen: false).fetchLists(),
    );
  }

  Future<String?> showAddTickListDialog() async {
    TextEditingController controller = TextEditingController();

    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Nový seznam"),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(
              hintText: "Zadejte název seznamu",
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text("Zpět"),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(controller.text),
              child: Text("Přidat"),
            ),
          ],
        );
      },
    );
  }

  addTickList(String name) {}

  removeTickList() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<ListProvider>(
        builder: (context, listsProvider, child) {
          if (listsProvider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          List<ListItemDto> lists = listsProvider.lists;

          return ListView.builder(
            itemCount: lists.length,
            itemBuilder: (context, index) {
              return ListItem(listItem: lists[index]);
            },
          );
        },
      ),
      bottomNavigationBar: CustomBottomNaviagtionBar(),
      appBar: CustomAppBar(text: "Home"),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("FAB na HomeScreen stisknut!");
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

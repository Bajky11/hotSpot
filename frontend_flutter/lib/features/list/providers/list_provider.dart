import 'package:before_leaving/features/list/models/list_item.dart';
import 'package:before_leaving/features/list/services/list_service.dart';
import 'package:flutter/material.dart';

class ListProvider extends ChangeNotifier {
  final ListService _service = ListService();
  List<ListItemDto> _lists = [];
  bool _isLoading = false;

  List<ListItemDto> get lists => _lists;
  bool get isLoading => _isLoading;

  Future<void> fetchLists() async {
    _isLoading = true;
    notifyListeners();

    try {
      _lists = await _service.fetchLists();
    } catch (e) {
      print("Chyba při načítání seznamů: $e");
    }

    _isLoading = false;
    notifyListeners();
  }
}

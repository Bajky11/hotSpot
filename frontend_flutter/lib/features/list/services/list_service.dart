import 'package:before_leaving/features/list/models/list_item.dart';
import 'package:before_leaving/common/services/api_service.dart';

class ListService {
  final String endpoint = "tickLists";

  Future<List<ListItemDto>> fetchLists() async {
    return ApiService.fetchData<ListItemDto>(endpoint, ListItemDto.fromJson);
  }
}

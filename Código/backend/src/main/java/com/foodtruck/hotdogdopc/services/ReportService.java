package com.foodtruck.hotdogdopc.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodtruck.hotdogdopc.models.Item;
import com.foodtruck.hotdogdopc.models.ItemByOrder;
import com.foodtruck.hotdogdopc.models.Report;
import com.foodtruck.hotdogdopc.repository.ReportRepository;
import com.foodtruck.hotdogdopc.repository.ItemByOrderRepository;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ItemByOrderRepository itemByOrderRepository;

    public List<Report> getAll() {
        generateReports();
        return reportRepository.findAll();
    }

    private void generateReports() {
        List<ItemByOrder> v_listOfItemByOrders = itemByOrderRepository.findOnNotExistingReport();
        for (ItemByOrder v_itemByOrder : v_listOfItemByOrders) {
            Item v_item = v_itemByOrder.getItem();
            Report v_reportExisting = reportRepository.findByItemAssociatied(v_item);
            if (v_reportExisting != null) {
                v_reportExisting.addQuantity(v_itemByOrder.getQuantity());
                v_reportExisting.addValorTotal(v_item.getPrice() * v_itemByOrder.getQuantity());
            } else {
                v_reportExisting = new Report();
                v_reportExisting.setItemAssociatied(v_item);
                v_reportExisting.setQuantity(v_itemByOrder.getQuantity());
                v_reportExisting.setValorTotal(v_item.getPrice() * v_itemByOrder.getQuantity());
            }
            v_itemByOrder.setReportAssociated(v_reportExisting);
            reportRepository.save(v_reportExisting);
            itemByOrderRepository.save(v_itemByOrder);
        }
    }

}

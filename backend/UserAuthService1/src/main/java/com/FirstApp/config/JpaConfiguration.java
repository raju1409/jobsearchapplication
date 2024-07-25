// package com.FirstApp.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.orm.jpa.JpaTransactionManager;
// import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
// import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
// import org.springframework.transaction.PlatformTransactionManager;

// import jakarta.persistence.EntityManagerFactory;
// import javax.sql.DataSource;
// import java.util.Properties;

// @Configuration
// public class JpaConfiguration {

//     @Autowired
//     private DataSource dataSource;

//     @Bean
//     public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//         LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
//         entityManagerFactoryBean.setDataSource(dataSource);
//         entityManagerFactoryBean.setPackagesToScan(
//                 "com.FirstApp.appuser",
//                 "com.FirstApp.registration.token" // Add this line to include the ConfirmationToken entity
//         );
//         entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

//         Properties jpaProperties = new Properties();
//         jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
//         jpaProperties.put("hibernate.hbm2ddl.auto", "update");

//         entityManagerFactoryBean.setJpaProperties(jpaProperties);

//         return entityManagerFactoryBean;
//     }

//     @Bean
//     public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
//         JpaTransactionManager transactionManager = new JpaTransactionManager();
//         transactionManager.setEntityManagerFactory(entityManagerFactory);
//         return transactionManager;
//     }
// }
